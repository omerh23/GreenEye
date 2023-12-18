from fastapi import UploadFile, File, APIRouter
import numpy as np
from io import BytesIO
from PIL import Image
from yolo.yolo import classify

router = APIRouter()

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

