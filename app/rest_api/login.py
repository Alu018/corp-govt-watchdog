import logging

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from typing import Any

from app.models.tables import User
from app.models.factory import factory
from app.types import UserInput


logger = logging.getLogger(__file__)


template = Jinja2Templates(directory="client/")


router = APIRouter()


@router.post(
    "/user/login",
    tags=["User"],
)
async def login(user_input: UserInput) -> dict[str, Any]:
    stmt = select(User).where(User.email == user_input.email)
    res = factory.execute_stmt(stmt)
    if res:
        raise HTTPException(
            status_code=400,
            detail=f"User {user_input.email} already exists!"
        )
    else:
        new_user = User(**user_input.model_dump())
        factory.add_object(new_user)
        return new_user.model_dump()
