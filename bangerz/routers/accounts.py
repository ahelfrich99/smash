from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token

from pydantic import BaseModel
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)
from typing import List
from authenticator import authenticator

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    print(account)
    return AccountToken(account=account, **token.dict())


@router.get("/accounts", response_model=List[AccountOut] | Error)
async def get_all(
    response: Response,
    repo: AccountQueries = Depends()
):
    result = repo.get_all()
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get list of users")
    else:
        response.status_code = 200
        return result


@router.get("/accounts/{user_id}", response_model=AccountOut | Error)
async def get_one(
    user_id: int,
    response: Response,
    repo: AccountQueries = Depends()
):
    result = repo.get_one(user_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid user id")
    return result


@router.delete("/accounts/{user_id}", response_model=bool | Error)
async def delete(
    user_id: int,
    response: Response,
    repo: AccountQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> bool | Error:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access feature")
    account_id = account.get("id")
    result = repo.delete(user_id, account_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid user id")
    else:
        response.status_code = 200
        return result


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
