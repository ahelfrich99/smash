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
):
    #response.status_code = 400
    return repo.create(homie)

@router.delete("/homies/{user_id}/{homie_id}", response_model=bool)
def delete(
    user_id: int,
    homie_id: int,
    response: Response,
    repo: HomieRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> bool:
    homie = HomieIn(user_id=user_id, homie_id=homie_id)
    result = repo.delete(homie)
    ##if isinstance(result, Error):
       ## response.status_code = 400
        ##return result
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
