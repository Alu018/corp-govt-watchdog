import logging
from uuid import uuid4

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.settings import Settings

logger = logging.getLogger(__file__)


template = Jinja2Templates(directory="client/")


router = APIRouter()


@router.get(
    "/",
    response_class=HTMLResponse,
)
async def home(request: Request):
    return template.TemplateResponse(request, name="dist/index.html")


@router.get(
    "/query",
    tags=["Chat"],
)
async def report_info(request: Request, query: str) -> str:
    return f"Hello, world! This is your query: {query}"
