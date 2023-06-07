from datetime import date
from typing import List, Optional, Union

from databases.comment import (create_comment, delete_comment,
                               get_all_comments, get_comment)
from databases.user import get_user
from helpers.account_helper import Account
from models.comment import Comment
from pydantic import BaseModel


class Error(BaseModel):
    message: str


class CommentIn(BaseModel):
    post_id: int
    content: str


class CommentOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    post_id: int
    content: str
    date: date
    like_count: Optional[int]


class CommentRepository(BaseModel):
    def create(self, account: Account, comment_in: CommentIn) -> CommentOut:
        comment = Comment(
                -1,
                account.user_id,
                comment_in.post_id,
                comment_in.content,
                date.today(),
                0
            )
        comment = create_comment(comment)

        return CommentOut(
            id=comment.id,
            first_name=account.first_name,
            last_name=account.last_name,
            username=account.username,
            post_id=comment.post_id,
            content=comment.content,
            date=comment.date,
            like_count=comment.like_count
        )

    def get_all(self, post_id: int) -> Union[List[CommentOut], Error]:
        comments = get_all_comments(post_id)
        comment_outs = []

        for comment in comments:
            user = get_user(comment.user_id)

            comment_outs.append(
                CommentOut(
                    id=comment.id,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username,
                    post_id=comment.post_id,
                    content=comment.content,
                    date=comment.date,
                    like_count=comment.like_count
                )
            )

        return comment_outs

    def delete(self, account: Account, comment_id: int) -> Union[bool, Error]:
        comment = get_comment(comment_id)
        user = get_user(comment.user_id)

        if user.id != account.user_id:
            return Error(message="User does not have permission to delete")

        delete_comment(comment_id)

        return True
