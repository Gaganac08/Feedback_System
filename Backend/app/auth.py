from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from . import models, database
import datetime

SECRET_KEY = "secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_user(db, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/signup")
def signup(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    if get_user(db, form.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    user = models.User(username=form.username, password=get_password_hash(form.password), role="employee")
    db.add(user)
    db.commit()
    return {"msg": "User created"}

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    user = get_user(db, form.username)
    if not user or not verify_password(form.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
