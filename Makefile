PYTHON_VERSION:=$(shell cat .python-version)
ROOT_DIR:=$(shell PWD)
ENV_FILE:=$(ROOT_DIR)/.env

DEFAULT_ANALYZE_HTTP_URL := "http://127.0.0.1:8000"
DEFAULT_ANALYZE_WS_URL := "ws://127.0.0.1:8000"

# Run commands
.PHONY: create-env install-backend-deps install-client-deps setup-precommit-hooks setup-env run-celery-workers run-backend-server run-client

create-env:
	touch $(ENV_FILE)

install-backend-deps: create-env
	brew install uv
	uv sync

setup-precommit-hooks: install-backend-deps
	uv run pre-commit install

setup-env: install-backend-deps install-client-deps setup-precommit-hooks

run-client:
	cd client && npm run dev

alembic-make-migrations:
	uv run alembic revision --autogenerate

alembic-migrate:
	uv run alembic upgrade head

run-server:
	uv run uvicorn app.server.main:app --reload --env-file=$(ENV_FILE)

run-migrations-and-server: make-migrations migrate
	uv run uvicorn app.server.main:app --reload --env-file=$(ENV_FILE)
	
