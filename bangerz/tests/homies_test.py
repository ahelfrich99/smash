from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from queries.homies import HomieRepository
from authenticator import authenticator
from typing import Optional

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
        username="Andrew",
        first_name="Lam",
        last_name="ee",
        email="eeh@gmail.com",
        profile_img=1,
    )
    return account.__dict__


class FakeHomieRepository:
    def get_all(self):
        return []


class FakeCreateHomieRepository:
    def create(self, homie):
        result = {
            "user_id": 1,
            "homie_id": 8
        }
        result.update(homie)
        return result


def test_get_homie_list():
    app.dependency_overrides[HomieRepository] = FakeHomieRepository
    response = client.get("/homies")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_homie():
    app.dependency_overrides[HomieRepository] = FakeCreateHomieRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
        ] = fake_get_current_account_data

    json = {
        "user_id": 1,
        "homie_id": 8
    }
    expected = {
        "user_id": 1,
        "homie_id": 8
    }

    response = client.post("/homies", json=json)

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
