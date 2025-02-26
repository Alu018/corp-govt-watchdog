from sqlmodel import Field, SQLModel, create_engine
from uuid import UUID, uuid4
from datetime import datetime

from app.settings import Settings


class User(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=lambda: uuid4())
    auth_token: UUID = Field(primary_key=True, default_factory=lambda: uuid4())
    email: str = Field(primary_key=True)
    password: str


class Campaign(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=lambda: uuid4())
    query: str
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    last_run: datetime = Field(default_factory=lambda: datetime.now())

    user_id: UUID | None = Field(default=None, foreign_key="user.id")



def create_db_and_tables():
    engine = create_engine(Settings.DB_URI)
    SQLModel.metadata.create_all(engine)
