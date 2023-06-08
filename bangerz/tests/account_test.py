from pydantic import BaseModel
from typing import Optional
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.accounts import AccountQueries

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
        username="pineapple",
        first_name="James",
        last_name="Oh",
        email="Jamesoh@gmail.com",
        profile_img=1,
    )
    return account.__dict__


class FakeAccountQuery:
    def get_all(self):
        return []


def test_get_all_accounts():
    # Arrange
    app.dependency_overrides[AccountQueries] = FakeAccountQuery
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    response = client.get("/accounts")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
