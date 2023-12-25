from fastapi import APIRouter
import re
import bcrypt

router = APIRouter()
from main import db

# Connect to MongoDB
collection = db["users"]


@router.post("/login")
async def login_validation(data: dict):
    # Check for empty fields
    if not all(data.values()):
        return {"status": "empty_fields"}

    # Retrieve user from the database based on the provided email
    existing_user = collection.find_one({"email": data['email']})

    if existing_user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), existing_user['password'].encode('utf-8')):
            existing_user['_id'] = str(existing_user['_id'])
            return {"status": "success", "user": existing_user}

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
