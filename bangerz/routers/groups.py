from fastapi import APIRouter, Depends, Response
from queries.groups import (
    Error,
    GroupIn,
    GroupOut,
    GroupRepository
)
from authenticator import authenticator

router = APIRouter()


@router.post("/groups", response_model=GroupOut | Error)
async def create(
    group: GroupIn,
    response: Response,
    repo: GroupRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> GroupOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")
    group_id = account.get("id")
    result = repo.create(group, int(group_id))
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to create new group")
    return result


@router.get("/groups", response_model=list[GroupOut] | Error)
async def get_all(
    response: Response,
    repo: GroupRepository = Depends()
):
    result = repo.get_all()
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get list of groups")
    else:
        response.status_code = 200
        return result


@router.get("/groups/{group_id}", response_model=GroupOut | Error)
async def get_one(
    group_id: int,
    response: Response,
    repo: GroupRepository = Depends()
):
    result = repo.get_one(group_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid group id")
    return result


@router.put("/groups/{group_id}", response_model=GroupOut | Error)
async def update(
    group_id: int,
    group: GroupIn,
    response: Response,
    repo: GroupRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> GroupOut | Error:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")
    account_id = account.get("id")
    result = repo.update(group_id, group, account_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to update group")
    else:
        response.status_code = 200
        return result


@router.delete("/groups/{group_id}", response_model=bool | Error)
async def delete(
    group_id: int,
    response: Response,
    repo: GroupRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> bool | Error:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")
    account_id = account.get("id")
    result = repo.delete(group_id, account_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid group id")
    else:
        response.status_code = 200
        return result
