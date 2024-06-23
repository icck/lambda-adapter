FROM public.ecr.aws/docker/library/python:3.12-slim-bookworm

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /backend

COPY ./pyproject.toml ./poetry.lock ./

COPY ./pyproject.toml ./poetry.lock ./
RUN pip install poetry --no-cache-dir && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

    COPY ./app ./app

    ENV PORT=8000
    EXPOSE ${PORT}
    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
