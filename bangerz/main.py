from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os

# Router imports
from routers import (
    accounts,
    groups,
    homies,
    posts,
)

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(homies.router)
app.include_router(posts.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# imported routers
app.include_router(groups.router)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
