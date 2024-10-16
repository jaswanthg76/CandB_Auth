from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta


class AuthHandler:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    secret = "SECRET_KEY"  # You should store this in an environment variable

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, username):
        payload = {
            "exp": datetime.utcnow() + timedelta(hours=1),
            "iat": datetime.utcnow(),
            "sub": username
        }
        return jwt.encode(payload, self.secret, algorithm="HS256")
