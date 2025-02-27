import logging
from typing import Any
from uuid import UUID

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
import requests
from sqlmodel import select

from app.settings import Settings
from app.models.tables import Campaign
from app.models.factory import factory
from app.types import QueryInput

logger = logging.getLogger(__file__)


router = APIRouter()


@router.get(
    "/campaigns",
    tags=["n8n"],
)
async def get_campaigns(id: str | None = None) -> list[Campaign]:
    try:
        stmt = select(Campaign)
        if id:
            stmt = stmt.where(Campaign.id == UUID(id))
        res = factory.execute_stmt(stmt)
        return [row._asdict()["Campaign"] for row in res]
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.post(
    "/query",
    tags=["n8n"],
)
async def launch_n8n_workflow(query: QueryInput) -> dict[str, Any]:
    try:
        requests.post( 
            Settings.N8N_WEBHOOK_URL,
            json={"text": query.text}
        ).json()

        # Workflow launched - create a new campaign
        campaign_obj = Campaign(query=query.text)
        factory.add_object(campaign_obj)
        return campaign_obj.model_dump()

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
