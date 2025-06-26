from fastapi import FastAPI, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import sqlite3

app = FastAPI()

# Allow frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DATABASE SETUP ----------
def init_db():
    conn = sqlite3.connect("feedback.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            comment TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# ---------- ROUTES ----------

@app.post("/signup")
def signup(
    username: str = Form(...),
    password: str = Form(...),
    local_kw: str = Query(...)
):
    conn = sqlite3.connect("feedback.db")
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return {"message": f"User '{username}' signed up successfully!"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")
    finally:
        conn.close()


@app.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...)
):
    conn = sqlite3.connect("feedback.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()
    if user:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")


@app.post("/submit")
def submit_feedback(
    username: str = Form(...),
    comment: str = Form(...)
):
    conn = sqlite3.connect("feedback.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO feedback (username, comment) VALUES (?, ?)", (username, comment))
    conn.commit()
    conn.close()
    return {"message": "Feedback submitted successfully"}


@app.get("/feedback")
def view_feedback() -> List[dict]:
    conn = sqlite3.connect("feedback.db")
    cursor = conn.cursor()
    cursor.execute("SELECT username, comment FROM feedback")
    feedback_list = [{"username": row[0], "comment": row[1]} for row in cursor.fetchall()]
    conn.close()
    return feedback_list
