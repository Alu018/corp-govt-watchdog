import os

from pydantic_settings import BaseSettings


class _Settings(BaseSettings):
    DB_URI: str = os.getenv("DB_URI", "sqlite:///database.db")
    CLIENT_ORIGIN: str = os.environ.get("CLIENT_ORIGIN", "http://localhost:5173")
    N8N_API_KEY: str = os.getenv("N8N_API_KEY", "test")


Settings = _Settings()
