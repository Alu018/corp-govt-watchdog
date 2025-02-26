from sqlalchemy import MetaData
from sqlalchemy.orm import as_declarative


@as_declarative(metadata=MetaData())
class Base:
    pass
