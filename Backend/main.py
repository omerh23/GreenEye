import secrets
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import dotenv
import uvicorn
import sys
from pathlib import Path
from pymongo import MongoClient
from app import router as app_router
from authentication import router as auth_router

import cloudinary

import os

sys.path.append(str(Path(__file__).resolve().parent.parent))

def generate_secret_key():
    return secrets.token_hex(32)



load_dotenv()
mongodb_url = os.getenv("MONGODB_URL")

app = FastAPI()

cluster = MongoClient(mongodb_url)
db = cluster["CLUSTER"]

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

# run on Render server
# if __name__ == "__main__":
#     uvicorn.run(app, host='0.0.0.0', port=8000)

# run on localhost
if __name__ == "__main__":
    key = generate_secret_key()
    with open(".env", "r") as file:
        lines = file.readlines()
    lines = [line for line in lines if not line.startswith("SECRET_KEY=")]
    with open(".env", "w") as file:
        file.writelines(lines)
    with open(".env", "a") as file:
        file.write(f"SECRET_KEY={key}\n")

    uvicorn.run(app, host='localhost', port=8000)
