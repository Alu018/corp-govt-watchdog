import os

from pydantic_settings import BaseSettings


class _Settings(BaseSettings):
    DB_URI: str = os.getenv("DB_URI", "sqlite:///database.db")
    CLIENT_ORIGIN: str = os.environ.get("CLIENT_ORIGIN", "http://localhost:3000")
    N8N_WEBHOOK_URL: str = os.getenv("N8N_WEBHOOK_URL", None)


Settings = _Settings()
