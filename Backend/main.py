from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import sys
from pathlib import Path
from pymongo import MongoClient
from app import router as app_router
from authentication import router as auth_router
from cameraDetect import router as cam_router

import cloudinary

import os
sys.path.append(str(Path(__file__).resolve().parent.parent))

load_dotenv()
mongodb_url = os.getenv("MONGODB_URL")

app = FastAPI()

cluster = MongoClient(mongodb_url)
db = cluster["GreenEye"]
userId = None

def setUserId(uid):
    userId = uid

origins = [
    "http://localhost",
    "http://127.0.0.1",
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

# Set your Cloudinary configuration
cloudImages = cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
)

app.include_router(auth_router)
app.include_router(app_router)
app.include_router(cam_router)



# run on Render server
# if __name__ == "__main__":
#     uvicorn.run(app, host='0.0.0.0', port=8000)

# run on localhost
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)

