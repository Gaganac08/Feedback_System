from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from . import models, database, auth
from jose import jwt, JWTError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

@router.post("/submit")
def submit_feedback(to_user: int, message: str, token: str = Depends(oauth2_scheme), db: Session = Depends(database.SessionLocal)):
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username = payload.get("sub")
        user = db.query(models.User).filter(models.User.username == username).first()
        feedback = models.Feedback(message=message, from_user=user.id, to_user=to_user)
        db.add(feedback)
        db.commit()
        return {"msg": "Feedback submitted"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/feedback")
def view_feedback(db: Session = Depends(database.SessionLocal)):
    feedback = db.query(models.Feedback).all()
    return feedback