import os
import cloudinary
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
import re
import bcrypt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient
import jwt
load_dotenv()
mongodb_url = os.getenv("MONGODB_URL")
db_url = os.getenv("DB")
router = APIRouter()
cluster = MongoClient(mongodb_url)
cluster_url = os.getenv("CLUSTER")
db = cluster[cluster_url]
algo = os.getenv("ALGO")
collection = db[db_url]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
cloudinary.config(
    cloud_name="dhd8azxmx",
    api_key="111939238442859",
    api_secret="ces7ll20zEYM1lp1C4CYt8BEIUQ"
)


def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[algo])
    user_id: str = payload.get("user_id")

    expiration = payload.get("exp")
    if expiration is None or datetime.fromtimestamp(expiration) < datetime.now():
        raise HTTPException(status_code=400, detail="Token expired")
    return user_id


@router.post("/login")
async def login_validation(data: dict):
    # Check for empty fields
    if not all(data.values()):
        return {"status": "empty_fields"}

    existing_user = collection.find_one({"email": data['email']})

    if existing_user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), existing_user['password'].encode('utf-8')):
            existing_user['_id'] = str(existing_user['_id'])

            current_key = os.getenv("SECRET_KEY")
            expiration_date = datetime.utcnow() + timedelta(days=1)

            token_data = {
                "user_id": str(existing_user['_id']),
                "exp": expiration_date
            }

            token = jwt.encode(token_data, current_key, algorithm=algo)

            return {"status": "success", "user": existing_user, "token": token}

    return {"status": "incorrect_details"}


@router.post("/register")
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
        "password": hashed_password.decode('utf-8'),
        "images": []
    })

    return {"status": "success"}




