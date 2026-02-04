FROM python:3.11-slim-bookworm AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

FROM base AS dep

COPY src/requirements.txt .

RUN uv pip install -r requirements.txt --system

FROM dep AS dev

COPY src/ .

EXPOSE 8000

CMD ["./entrypoint.sh"]

FROM dep AS prod

COPY src/ .
RUN useradd -m django
USER django

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]

#sudo docker compose up --build