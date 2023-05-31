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

@router.post("/group_comment", response_model=GroupCommentOut | Error)
async def create(
    g_comment: GroupCommentIn,
    response: Response,
    repo: GroupCommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> GroupCommentOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to add a comment")

    result = repo.create(g_comment)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not create comment")

    return result
