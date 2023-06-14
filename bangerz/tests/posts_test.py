from typing import Optional

from fastapi.testclient import TestClient
from main import app
from pydantic import BaseModel
from queries.posts import PostRepository


client = TestClient(app)


class FakeAllPostsRepo:
    def get_all(self, account: dict):
        return []


def test_get_all_posts():
    app.dependency_overrides[PostRepository] = FakeAllPostsRepo
    response = client.get("/posts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
