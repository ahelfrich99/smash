from pydantic import BaseModel
from typing import Optional
from fastapi.testclient import TestClient
from main import app
from queries.bangerz import BangerRepository


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
        id=1,
        username="kristen13",
        first_name="Kristen",
        last_name="L",
        email="kristenl@yahoo.com",
        profile_img=1,
    )
    print(account)
    return account.__dict__


class FakeBangerzRepository:
    def get_all(self):
        return []


def test_get_bangerz_list():
    app.dependency_overrides[BangerRepository] = FakeBangerzRepository
    response = client.get("/bangerz")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
