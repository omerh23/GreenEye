from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))
from yolo.yolo import classify

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://greeneye-frontend.onrender.com",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


@app.get("/")
async def run():
    return "Server Running"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
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

@app.post("/login")
async def login_validation(data: dict):
    name = data.get("username", "")
    if name == 'omer':
        return 'good'


# run on Render server
# if __name__ == "__main__":
#     uvicorn.run(app, host='0.0.0.0', port=8000)

# run on localhost
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
