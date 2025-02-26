from contextlib import contextmanager
from sqlmodel import SQLModel
from sqlalchemy import Select, create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import scoped_session, sessionmaker

from app.settings import Settings


class _SessionFactory:
    engine: Engine

    def __init__(self):
        self.engine = create_engine(
            Settings.DB_URI,
            pool_size=10,
            max_overflow=2,
            echo=False,
            pool_pre_ping=True,
        )

    @contextmanager
    def create_session(self):
        session_factory = sessionmaker()
        Session = scoped_session(session_factory)
        Session.configure(bind=self.engine)
        session = Session()
        try:
            yield session
        finally:
            session.close()
            Session.remove()

    def execute_stmt(self, stmt: Select):
        with self.create_session() as session:
            res = session.execute(stmt)
            return res.all()
    
    def add_object(self, db_object: type[SQLModel]):
        with self.create_session() as session:
            session.add(db_object)
            session.commit()
            session.refresh(db_object)


factory = _SessionFactory()
