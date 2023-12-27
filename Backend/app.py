import tempfile
import base64
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import UploadFile, File, APIRouter, HTTPException, Depends
import numpy as np
from io import BytesIO
from PIL import Image
from pymongo import MongoClient
from Backend.authentication import get_current_user
from yolo.yolo import classify
import os
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import cloudinary
from pydantic import BaseModel

load_dotenv()
router = APIRouter()
mongodb_url = os.getenv("MONGODB_URL")
db_url = os.getenv("DB")
cluster = MongoClient(mongodb_url)
cluster_url = os.getenv("CLUSTER")
db = cluster[cluster_url]
algo = os.getenv("ALGO")
collection = db[db_url]

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)


@router.get("/ping")
async def ping():
    return "Hello, I am alive"


@router.get("/")
async def run():
    return "Server Running"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".jpg", ".jpeg")):
        return {
            'class': "Error, support only JPG images",
            'confidence': 1
        }

    image = read_file_as_image(await file.read())
    predTuple = classify(image)

    return {
        'class': predTuple[0],
        'confidence': float(predTuple[1])
    }


class ImageData(BaseModel):
    imageUri: str
    token: str


@router.post("/test")
async def receive_image(data: ImageData):
    try:
        # if not(get_current_user(data.token)):
        #     return {"message": "Authorization failed"}

        userId = ObjectId(get_current_user(data.token))
        header, encoded = data.imageUri.split(",", 1)
        image_data = base64.b64decode(encoded)

        # Use a temporary file to upload to Cloudinary
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as file:
            file.write(image_data)
            file_path = file.name

        # Upload to Cloudinary
        response = upload(file_path, folder="your_folder_name")  # specify your folder name
        image_url = response.get("url")

        # Clean up the temporary file
        os.remove(file_path)

        # Save the URL to MongoDB
        # Assuming you have a field 'images' which is a list
        update_result = collection.update_one({"_id": userId}, {"$push": {"images": image_url}})

        if update_result.modified_count == 0:
            return {"message": "Failed to update the database"}

        image = np.array(Image.open(BytesIO(image_data)))

        predTuple = classify(image)
        return {
            'Result':predTuple[0],
            'confidence': float(predTuple[1])
        }

        # return {"message": "Image uploaded successfully", "url": image_url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")
