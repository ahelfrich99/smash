from fastapi import APIRouter, Depends, Response
from typing import List
from authenticator import authenticator

from queries.group_comments import (
    Error,
    GroupCommentIn,
    GroupCommentOut,
    GroupCommentRepository
)

router = APIRouter()

@router.post("/group_posts/{group_post_id}/group_comments", response_model=GroupCommentOut | Error)
async def create(
    group_comment: GroupCommentIn,
    response: Response,
    repo: GroupCommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> GroupCommentOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to add a comment")

    result = repo.create(group_comment)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not create comment")

    return result


@router.get("/group_posts/{post_id}/group_comments", response_model=List[GroupCommentOut] | Error)
async def get_all(
    post_id: int,
    response: Response,
    repo: GroupCommentRepository = Depends(),
):
    result = repo.get_all(post_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not get all Group Comments")
    else:
        response.status_code = 200
        return result

@router.get("/group_posts/{post_id}/{g_comment_id}", response_model=GroupCommentOut | Error)
async def get_one(
    g_comment_id: int,
    repo: GroupCommentRepository = Depends(),
) -> GroupCommentOut:
    result = repo.get_one(g_comment_id)

    if result is None:
        result = Error(message="Invalid group comment id")

    return result



@router.put(
    "/group_posts/{post_id}/{g_comment_id}", response_model=GroupCommentOut | Error
)
def update(
    g_comment_id: int,
    g_comment: GroupCommentIn,
    response: Response,
    repo: GroupCommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> GroupCommentOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    result = repo.update(g_comment_id, g_comment)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not update comment")
    else:
        response.status_code = 200
        return result


@router.put(
    "/group_posts/{post_id}/{g_comment_id}/like", response_model=bool | Error
)
def increment_like_count(
    g_comment_id: int,
    response: Response,
    repo: GroupCommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> bool:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    result = repo.increment_like_count(g_comment_id)

    if result is None:
        response.status_code = 404
        return Error(message="Could not update like count")
    else:
        response.status_code = 200
        return result



@router.delete(
    "/group_posts/{post_id}/{g_comment_id}", response_model=bool | Error
)
def delete(
    g_comment_id: int,
    response: Response,
    repo: GroupCommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> bool:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    result = repo.delete(g_comment_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Invalid group comment id")
    else:
        response.status_code = 200
        return result
