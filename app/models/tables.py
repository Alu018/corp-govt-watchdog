from sqlmodel import Field, SQLModel, create_engine
from uuid import UUID, uuid4

from app.models.base import Base
from app.settings import Settings


class User(SQLModel, Base, table=True):
    id: UUID = Field(primary_key=True, default_factory=lambda: uuid4())
    auth_token: UUID = Field(primary_key=True, default_factory=lambda: uuid4())
    email: str = Field(primary_key=True)
    password: str


# Create engine
engine = create_engine(Settings.DB_URI)
SQLModel.metadata.create_all(engine)
