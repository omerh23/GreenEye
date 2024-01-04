import datetime
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
        os.remove(file_path)

        image = np.array(Image.open(BytesIO(image_data)))

        predTuple = classify(image)

        update_result = collection.update_one(
            {"_id": userId},
            {
                "$push": {
                    "images": {
                        "url": image_url,
                        "description": f"Result: {predTuple[0]}, confidence: {predTuple[1]}",
                        "uploaded": datetime.date.today().isoformat()
                    }
                }
            }
        )

        if update_result.modified_count == 0:
            return {"message": "Failed to update the database"}

        return {
            'Result':predTuple[0],
            'confidence': float(predTuple[1])
        }

        # return {"message": "Image uploaded successfully", "url": image_url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")

class obj:
  def __init__(self, url, description, uploaded):
    self.url = url
    self.description = description
    self.uploaded = uploaded


ob = obj('http://res.cloudinary.com/dhd8azxmx/image/upload/v1704304935/your_folder_name/st9dtfbxkhx9fuaqje7l.png',
         "Potato_healthy, confidence: 1", "2024-01-03")

ob2 = obj("http://res.cloudinary.com/dhd8azxmx/image/upload/v1704304935/your_folder_name/st9dtfbxkhx9fuaqje7l.png",
         "Potato_healthy, confidence: 10", "2024-01-04")
ob3 = obj("http://res.cloudinary.com/dhd8azxmx/image/upload/v1704304935/your_folder_name/st9dtfbxkhx9fuaqje7l.png",
         "Potato_healthy, confidence: 10", "2024-01-05")
images = []
images.append(ob)
images.append(ob2)
images.append(ob3)


@router.post("/latestHistory")
#async def receive_image(data: dict):
async def receive_image():
    try:
        #userId = ObjectId(get_current_user(data["token"]))
        #existing_user = collection.find_one({"_id": "123"})
        return images



    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")




