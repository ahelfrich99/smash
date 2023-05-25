from fastapi import APIRouter, Depends, Response
from queries.bangerz import BangerIn, BangerRepository, BangerOut, Error
from typing import Union, List

router = APIRouter()

@router.post("/bangerz", response_model=Union[BangerOut, Error])
def create_banger(banger: BangerIn, response: Response, repo: BangerRepository = Depends()):
    created_banger = repo.create(banger)
    if isinstance(created_banger, Error):
        response.status_code = 500
        return created_banger
    return created_banger

@router.get("/bangerz", response_model=Union[List[BangerOut], Error])
def get_all(response: Response, repo: BangerRepository = Depends()):
    bangerz = repo.get_all()
    if isinstance(bangerz, Error):
        response.status_code = 404
        return bangerz
    return bangerz

@router.put("/bangerz/{banger_id}", response_model=Union[BangerOut, Error])
def update_banger(banger_id: int, banger: BangerIn, response: Response, repo: BangerRepository = Depends()) -> Union[BangerOut, Error]:
    updated_banger = repo.update(banger_id, banger)
    if isinstance(updated_banger, Error):
        response.status_code = 404
        return updated_banger
    return updated_banger

@router.delete("/bangerz/{banger_id}", response_model=Union[bool, Error])
def delete_banger(banger_id: int, response: Response, repo: BangerRepository = Depends()) -> Union[bool, Error]:
    deleted_banger = repo.delete(banger_id)
    if isinstance(deleted_banger, Error):
        response.status_code = 404
        return deleted_banger
    return deleted_banger

@router.get("/bangerz/{banger_id}", response_model=Union[BangerOut, Error])
def get_one(banger_id: int, response: Response, repo: BangerRepository = Depends()) -> BangerOut:
    banger = repo.get_one(banger_id)
    if isinstance(banger, Error):
        response.status_code = 404
        return banger
    return banger
