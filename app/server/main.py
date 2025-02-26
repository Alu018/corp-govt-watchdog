import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.rest_api.chat import router as chat_router
from app.rest_api.login import router as user_router
from app.settings import Settings
from starlette.middleware.sessions import SessionMiddleware


# FastAPI app
app = FastAPI()
app.include_router(chat_router)
app.include_router(user_router)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Settings.CLIENT_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_MIDDLEWARE_SECRET_KEY", "test"),
    max_age=None,  # session cookies expire when the browser is closed
)

# Static / templates
# app.mount("/assets", StaticFiles(directory="client/dist/assets"), name="assets")
