from pydantic import BaseModel
from typing import Optional
from fastapi.testclient import TestClient
from main import app
from queries.groups import GroupRepository


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
    print(account)
    return account.__dict__


class FakeGroupListRepository:
    def get_all(self):
        return []


# class CreateGroupRepository:
#     def create(self, group):
#         result = {
#             "id": 1,
#             "group_name": group.group_name,
#             "group_size": group.group_size,
#             "group_img": group.group_img,
#             "description": group.description,
#         }
#         return result


class GetGroupRepository:
    def get_one(self, group_id):
        return {
            "id": group_id,
            "group_name": "string",
            "group_size": 0,
            "group_img": 0,
            "description": "string"
        }


def test_get_group_list():
    app.dependency_overrides[GroupRepository] = FakeGroupListRepository
    response = client.get("/groups")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


# def test_create_group():
#     app.dependency_overrides[GroupRepository] = CreateGroupRepository
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = fake_get_current_account_data
#     json = {
#         "group_name": "string",
#         "group_size": 0,
#         "group_img": 0,
#         "description": "string"
#     }
#     headers = {
#         "Authorization": "Bearer <your_valid_token_here>"
#     }
#     expected = {
#         "id": 0,
#         "group_name": "string",
#         "group_size": 0,
#         "group_img": 0,
#         "description": "string"
#     }
#     response = client.post("/groups", json=json, headers=headers)
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == expected


def test_get_group():
    app.dependency_overrides[GroupRepository] = GetGroupRepository
    response = client.get("/groups/1")
    expected = {
        "id": 1,
        "group_name": "string",
        "group_size": 0,
        "group_img": 0,
        "description": "string"
    }
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
