from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import sys
from pathlib import Path
from pymongo import MongoClient
import re
import bcrypt

sys.path.append(str(Path(__file__).resolve().parent.parent))
from yolo.yolo import classify

app = FastAPI()

# Connect to MongoDB
cluster = MongoClient("mongodb+srv://guy1179:GreenEye7070@greeneye.ia5rjyn.mongodb.net/?retryWrites=true&w=majority")
db = cluster["GreenEye"]
collection = db["users"]

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


import bcrypt

# ...

@app.post("/login")
async def login_validation(data: dict):
    # Check for empty fields
    if not all(data.values()):
        return {"status": "empty_fields"}

    # Retrieve user from the database based on the provided email
    existing_user = collection.find_one({"email": data['email']})

    if existing_user:
        # Hash the provided password for comparison
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), existing_user['password'].encode('utf-8'))

        if bcrypt.checkpw(data['password'].encode('utf-8'), existing_user['password'].encode('utf-8')):
            return {"status": "success"}
        else:
            return {"status": "incorrect_password"}
    else:
        return {"status": "user_not_found"}




@app.post("/register")
async def register_validation(data: dict):
    if not all(data.values()):
        return {"status": "empty_fields"}

    if len(data['password']) < 6:
        return {"status": "short_password"}

    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, data['email']):
        return {"status": "invalid_email"}

    existing_user = collection.find_one({"email": data['email']})
    if existing_user:
        return {"status": "email_already_registered"}

    if data['password'] != data['confirmPassword']:
        return {"status": "mismatch"}

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    collection.insert_one({
        "username": data['username'],
        "email": data['email'],
        "password": hashed_password.decode('utf-8')
    })

    return {"status": "success"}


# run on Render server
if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)

# run on localhost
# if __name__ == "__main__":
#     uvicorn.run(app, host='localhost', port=8000)
