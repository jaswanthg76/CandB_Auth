from pymongo import MongoClient
from pymongo.errors import ConnectionError

try:
    client = MongoClient(
        "mongodb+srv://sos1vardhankeerthi:12345@candb.whauc.mongodb.net/?retryWrites=true&w=majority&appName=CANDB")
    db = client.your_database_name
    # Try a simple command to check the connection
    client.admin.command('ping')
    print("MongoDB connection established.")
except ConnectionError as e:
    print(f"Failed to connect to MongoDB: {e}")
