# lambda-adapter

This is lambda adapter sample code.

```mermaid
flowchart LR
    Request --> |HTTP| API_Gateway
    API_Gateway --> |Invoke| Lambda
    Lambda --> |Adapter| FastAPI
```
