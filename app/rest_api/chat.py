import logging
from typing import Any

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
import requests

from app.settings import Settings

logger = logging.getLogger(__file__)


router = APIRouter()


@router.post(
    "/query",
    tags=["n8n"],
)
async def launch_n8n_workflow(text: str) -> dict[str, Any]:
    try:
        return requests.post(
            Settings.N8N_WEBHOOK_URL,
            json={"text": text}
        ).json()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
