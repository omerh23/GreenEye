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
import requests

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


def load_image_to_array(image_path):
    # Open the image file
    with Image.open(image_path) as img:
        # Convert the image to RGB (if not already in this format)
        img = img.convert('RGB')

        # Convert the image to a NumPy array
        img_array = np.array(img)

        return img_array

def upload_image_to_cloudinary(image_path):
    response = cloudinary.uploader.upload(image_path)
    return response


class ImageData(BaseModel):
    imageUri: str
    token: str


@router.post("/manualCapture")
async def receive_image(data: ImageData):
    try:
        userId = ObjectId(get_current_user(data.token))
        header, encoded = data.imageUri.split(",", 1)
        image_data = base64.b64decode(encoded)
        detect = False

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

        # name = input("Enter image name: ")
        # image_path = rf'C:\Users\omerh\PycharmProjects\GreenEye\mobile\images\{name}.jpg'
        #
        # array = load_image_to_array(image_path)
        # upload_response = upload_image_to_cloudinary(image_path)
        #
        # predTuple = classify(array)

        if predTuple[1] > 50:
            detect = True

        update_result = collection.update_one(
            {"_id": userId},
            {
                "$push": {
                    "images": {
                        "url": image_url,
                        #"url": upload_response['url'],
                        "description": f"Result: {predTuple[0]}, confidence: {predTuple[1]}%",
                        "uploaded": datetime.date.today().isoformat(),
                        "isDetected": detect,
                        "isManual": True
                    }
                }
            }
        )

        if update_result.modified_count == 0:
            return {"message": "Failed to update the database"}

        return {
            'Result': predTuple[0],
            'confidence': float(predTuple[1])
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")

class obj:
  def __init__(self, url, description, uploaded):
    self.url = url
    self.description = description
    self.uploaded = uploaded


@router.post("/latestHistory")
async def receive_image(data: dict):
    try:
        userId = ObjectId(get_current_user(data["token"]))
        existing_user = collection.find_one({"_id": userId})

        latestHistory = []
        for image_info in existing_user['images']:
            image_url = image_info['url']
            response = requests.get(image_url)

            if response.status_code == 200:
                base64_image = base64.b64encode(response.content).decode('utf-8')
                latestHistory.append({
                    'url': f"data:image/jpeg;base64,{base64_image}",
                    'description': image_info['description'],
                    'uploaded': image_info['uploaded']
                })
            else:
                print("Failed to download the image")

        return latestHistory

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")


@router.post('/detectionHistory')
async def manualDetection(data: dict):
    try:
        userId = ObjectId(get_current_user(data["token"]))
        existing_user = collection.find_one({"_id": userId})

        latestHistory = []
        for image_info in existing_user['images']:

            if image_info['isDetected']:
                image_url = image_info['url']
                response = requests.get(image_url)
                if response.status_code == 200:
                    base64_image = base64.b64encode(response.content).decode('utf-8')
                    latestHistory.append({
                        'url': f"data:image/jpeg;base64,{base64_image}",
                        'description': image_info['description'],
                        'uploaded': image_info['uploaded']
                    })
                else:
                    print("Failed to download the image")

        return latestHistory

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")


@router.post('/manualDetection')
async def manualDetection(data: dict):
    try:
        userId = ObjectId(get_current_user(data["token"]))
        existing_user = collection.find_one({"_id": userId})

        latestHistory = []
        for image_info in existing_user['images']:

            if image_info['isManual']:
                image_url = image_info['url']
                response = requests.get(image_url)
                if response.status_code == 200:
                    base64_image = base64.b64encode(response.content).decode('utf-8')
                    latestHistory.append({
                        'url': f"data:image/jpeg;base64,{base64_image}",
                        'description': image_info['description'],
                        'uploaded': image_info['uploaded']
                    })
                else:
                    print("Failed to download the image")

        return latestHistory

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {e}")

