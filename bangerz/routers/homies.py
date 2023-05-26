from fastapi import APIRouter, Depends, Response
from typing import List
from authenticator import authenticator

from queries.homies import (
    Error,
    HomieIn,
    HomieOut,
    HomieRepository
)

router = APIRouter()

@router.post("/homies", response_model=HomieOut | Error)
async def create(
    homie: HomieIn,
    response: Response,
    repo: HomieRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> HomieOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to add a homie")

    result = repo.create(homie)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not create homie")

    return result

@router.delete("/homies/{user_id}/{homie_id}", response_model=bool | Error)
def delete(
    user_id: int,
    homie_id: int,
    response: Response,
    repo: HomieRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> bool:

    if account is None:
        response.status_code = 401
        return Error(message="Sign in to delete a homie")

    homie = HomieIn(user_id=user_id, homie_id=homie_id)
    result = repo.delete(homie)

    if result is None:
        response.status_code = 404
        result = Error(message="Could not delete homie")
    return result


@router.get("/homies", response_model=List[HomieOut] | Error)
async def get_all(
    repo: HomieRepository = Depends(),
):
    return repo.get_all()

@router.get("/homies/{user_id}", response_model=List[HomieOut] | Error)
async def get_one(
    user_id: int,
    repo: HomieRepository = Depends(),
):
    return repo.get_one(user_id)
