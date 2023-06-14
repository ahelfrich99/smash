from typing import Union

from databases.like import (create_like, delete_like, get_like,
                            get_like_count,
                            post_liked_by_user)
from helpers.account_helper import Account
from models.like import Like
from pydantic import BaseModel


class Error(BaseModel):
    message: str


class LikeIn(BaseModel):
    post_id: int


class LikeOut(BaseModel):
    id: int
    user_id: int
    post_id: int


class LikeRepository(BaseModel):
    def create(self, account: Account, like_in: LikeIn) -> LikeOut:
        if post_liked_by_user(like_in.post_id, account.user_id):
            return None

        like = Like(
                -1,
                account.user_id,
                like_in.post_id
            )
        like = create_like(like)

        return LikeOut(
            id=like.id,
            user_id=account.user_id,
            post_id=like.post_id
        )

    def get_one(self, like_id: int) -> Union[LikeOut, Error]:
        like = get_like(like_id)

        return LikeOut(
                    id=like.id,
                    user_id=like.user_id,
                    post_id=like.post_id
                )

    def delete(self, account: Account, post_id: int) -> Union[bool, Error]:
        delete_like(post_id, account.user_id)

        return True

    def like_count(self, post_id: int) -> Union[int, Error]:
        likes = get_like_count(post_id)

        return likes
