from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Database setup (replace with your MongoDB connection string)
client = MongoClient(
    "mongodb+srv://jaswanthg76:12345@cluster0.q6ud2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.your_database_name
users_collection = db.users

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserSignUp(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class AuthHandler:
    def get_password_hash(self, password: str):
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    def create_token(self, username: str):
        payload = {
            "sub": username,
            "exp": datetime.utcnow() + timedelta(hours=1)
        }
        token = jwt.encode(payload, "your_secret_key", algorithm="HS256")
        return token


auth_handler = AuthHandler()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post('/signup')
async def sign_up(user: UserSignUp):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = auth_handler.get_password_hash(user.password)
    user_dict = user.dict()
    user_dict['password'] = hashed_password
    users_collection.insert_one(user_dict)
    return {"message": "User created successfully"}


@app.post('/login')
async def login(user: UserLogin):
    db_user = users_collection.find_one({"username": user.username})

    if db_user and auth_handler.verify_password(user.password, db_user['password']):
        token = auth_handler.create_token(user.username)
        return {"token": token}

    raise HTTPException(status_code=401, detail="Invalid username or password")
