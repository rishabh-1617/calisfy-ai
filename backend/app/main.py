from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

app = FastAPI(title="Calisfy AI API", version="1.0.0")
password_hash = PasswordHash((Argon2Hasher(),))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "Calisfy AI"}
