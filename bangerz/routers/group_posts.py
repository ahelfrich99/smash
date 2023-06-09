from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.group_posts import (
    Error,
    GroupPostIn,
    GroupPostOut,
    GroupPostRepository
)
from authenticator import authenticator

router = APIRouter()


@router.post("/group_posts", response_model=Union[GroupPostOut, Error])
def create(
    g_post: GroupPostIn,
    response: Response,
    repo: GroupPostRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> GroupPostOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")
    result = repo.create(g_post)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to create group post")
    return result


@router.get("/group_posts", response_model=Union[List[GroupPostOut], Error])
def get_all(
    response: Response,
    repo: GroupPostRepository = Depends()
):
    result = repo.get_all()

    if result is None:
        response.status_code = 404
        result = Error(message="Could not get list of group posts")
    else:
        response.status_code = 200
        return result


@router.get(
    "/group_posts/{group_post_id}",
    response_model=Union[GroupPostOut, Error])
def get_one(
    group_post_id: int,
    response: Response,
    repo: GroupPostRepository = Depends()
) -> GroupPostOut:
    result = repo.get_one(group_post_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Invalid group post id")

    return result


@router.put(
    "/group_posts/{group_post_id}",
    response_model=Union[GroupPostOut, Error])
def update(
    group_post_id: int,
    g_post: GroupPostIn,
    response: Response,
    repo: GroupPostRepository = Depends(),
) -> Union[GroupPostOut, Error]:
    result = repo.update(group_post_id, g_post)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not update group post")
    else:
        response.status_code = 200
        return result


@router.delete(
    "/group_posts/{group_post_id}",
    response_model=Union[bool, Error])
def delete(
    group_post_id: int,
    response: Response,
    repo: GroupPostRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> Union[bool, Error]:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")

    result = repo.delete(group_post_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Sign in to access feature")
    else:
        response.status_code = 200
        return result
