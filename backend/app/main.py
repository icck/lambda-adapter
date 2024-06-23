import logging
import os

from fastapi import FastAPI

CORS_ALLOW_ORIGINS = os.environ.get("CORS_ALLOW_ORIGINS", "*")

logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s - %(message)s")
logger = logging.getLogger(__name__)

openapi_tags = [{"name": "sample_api", "description": "Sample API"}]
title = "Sample API"

app = FastAPI(
    openapi_tags=openapi_tags,
    title=title,
)


@app.get("/")
def root() -> dict:
    return {"message": "this is the root of the API"}


@app.get("/hello")
def hello() -> dict:
    return {"message": "Hello World"}


# debug
if __name__ == "__main__":
    import uvicorn

    logger.info("Starting uvicorn in reload mode")
    uvicorn.run("main:app", host="localhost", reload=True, port=8000)
