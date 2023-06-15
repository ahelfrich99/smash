from typing import Optional

from fastapi.testclient import TestClient
from main import app
from pydantic import BaseModel
from queries.posts import PostRepository


client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    profile_img: Optional[int]


def fake_get_current_account_data():
    account = AccountOut(
        id=2,
        username="wizardri",
        first_name="Adrianna",
        last_name="Helfrich",
        email="ahelfrich@gmail.com",
        profile_img=2,
    )
    print(account)
    return account.__dict__


class FakeAllPostsRepo:
    def get_all(self, account):
        return []


def test_get_all_posts():
    app.dependency_overrides[PostRepository] = FakeAllPostsRepo
    response = client.get("/posts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
