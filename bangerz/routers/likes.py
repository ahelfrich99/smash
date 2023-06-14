from typing import Union

from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from helpers.account_helper import Account
from queries.likes import Error, LikeIn, LikeOut, LikeRepository

router = APIRouter()


@router.post("/likes", response_model=Union[LikeOut, Error])
def create_like(
    like: LikeIn,
    response: Response,
    repo: LikeRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> LikeOut:
    if account is None:
        # display 401 unauthorized error
        response.status_code = 401
        return Error(message="Sign in to like")

    curr_account = Account(account)
    result = repo.create(curr_account, like)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not create like")

    return result


@router.delete("/likes/{like_id}", response_model=Union[bool, Error])
def delete(
    like_id: int,
    response: Response,
    repo: LikeRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> Union[bool, Error]:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")

    curr_account = Account(account)
    result = repo.delete(curr_account, like_id)

    if result is None:
        response.status_code = 404
        result = Error(message="Invalid like id")
    else:
        response.status_code = 200
        return result
