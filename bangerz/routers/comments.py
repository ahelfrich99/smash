from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.comments import Error, CommentRepository, CommentIn, CommentOut
from authenticator import authenticator

router = APIRouter()


@router.post(
    "/posts/{post_id}/comments", response_model=Union[CommentOut, Error]
)
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> CommentOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to make a comment on a post")

    result = repo.create(comment)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not create comment")

    return result


@router.get(
    "/posts/{post_id}/comments", response_model=Union[List[CommentOut], Error]
)
def get_all(
    post_id: int,
    response: Response,
    repo: CommentRepository = Depends(),
):
    result = repo.get_all(post_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not get all comments")
    else:
        response.status_code = 200
        return result


@router.get(
    "/posts/{post_id}/{comment_id}", response_model=Union[CommentOut, Error]
)
def get_one(
    comment_id: int,
    repo: CommentRepository = Depends(),
) -> CommentOut:
    result = repo.get_one(comment_id)

    if result is None:
        result = Error(message="Invalid comment id")

    return result


@router.put(
    "/posts/{post_id}/{comment_id}", response_model=Union[CommentOut, Error]
)
def update(
    comment_id: int,
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> Union[CommentOut, Error]:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    result = repo.update(comment_id, comment)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not update comment")
    else:
        response.status_code = 200
        return result


@router.delete(
    "/posts/{post_id}/{comment_id}", response_model=Union[bool, Error]
)
def delete(
    comment_id: int,
    response: Response,
    repo: CommentRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> Union[bool, Error]:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    result = repo.delete(comment_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Invalid comment id")
    else:
        response.status_code = 200
        return result
