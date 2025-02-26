PYTHON_VERSION:=$(shell cat .python-version)
ROOT_DIR:=$(shell PWD)
ENV_FILE:=$(ROOT_DIR)/.env

DEFAULT_ANALYZE_HTTP_URL := "http://127.0.0.1:8000"
DEFAULT_ANALYZE_WS_URL := "ws://127.0.0.1:8000"

# Run commands
.PHONY: create-env install-backend-deps install-client-deps setup-precommit-hooks setup-env run-celery-workers run-backend-server run-client

create-env:
	touch $(ENV_FILE)
	@if grep -q 'VITE_BACKEND_BASE_URL=.*' $(ENV_FILE); then \
		sed -i '' 's|VITE_BACKEND_BASE_URL=.*|VITE_BACKEND_BASE_URL=$(DEFAULT_ANALYZE_HTTP_URL)|g' $(ENV_FILE); \
	else \
		echo 'VITE_BACKEND_BASE_URL=$(DEFAULT_ANALYZE_HTTP_URL)' >> $(ENV_FILE); \
	fi
	@if grep -q 'VITE_ANALYZE_WS_URL=.*' $(ENV_FILE); then \
		sed -i '' 's|VITE_ANALYZE_WS_URL=.*|VITE_ANALYZE_WS_URL=$(DEFAULT_ANALYZE_WS_URL)|g' $(ENV_FILE); \
	else \
		echo 'VITE_ANALYZE_WS_URL=$(DEFAULT_ANALYZE_WS_URL)' >> $(ENV_FILE); \
	fi

install-backend-deps: create-env
	brew install uv
	uv sync

install-client-deps:
	brew install node
	cd client && npm install --save

setup-precommit-hooks: install-backend-deps
	uv run pre-commit install
	cd client && npx husky init
	sed -i .bak '/npm test/d' client/.husky/pre-commit
	echo "cd client && npx lint-staged" >> client/.husky/pre-commit
	echo "cd .. && uv run pre-commit run" >> client/.husky/pre-commit
	npx husky client/.husky
	@if [ -d .husky ]; then \
		rm -rf .husky; \
	fi
	mv client/.husky .
	rm .husky/pre-commit.bak
	git config core.hooksPaht .husky/_

setup-env: install-backend-deps install-client-deps setup-precommit-hooks

run-server:
	uv run uvicorn app.server.main:app --reload --env-file=$(ENV_FILE)

run-client:
	cd client && npm run dev

setup-db:
	uv run alembic upgrade head
