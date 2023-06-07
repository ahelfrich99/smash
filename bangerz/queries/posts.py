from datetime import date
from typing import List, Optional, Union

from databases.banger import get_banger
from databases.post import (create_post, delete_post, get_all_posts, get_post,
                            update_post, like_post)
from databases.user import get_user
from helpers.account_helper import Account
from models.post import Post
from pydantic import BaseModel


class Error(BaseModel):
    message: str


# Data that is coming into the app
class PostIn(BaseModel):
    banger_id: Optional[int]
    text: str


# Data being returned by the app
class PostOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    banger_id: Optional[int]
    song_title: str
    artist: str
    album: str
    text: str
    date: date
    like_count: Optional[int]


class PostRepository(BaseModel):
    def create(self, account: Account, post_in: PostIn) -> PostOut:
        # create Post model from PostIn
        post = Post(
                -1,
                account.user_id,
                post_in.banger_id,
                post_in.text,
                date.today(),
                0
            )
        post = create_post(post)
        banger = get_banger(post_in.banger_id)

        return PostOut(
            id=post.id,
            first_name=account.first_name,
            last_name=account.last_name,
            username=account.username,
            banger_id=banger.id,
            song_title=banger.song_title,
            artist=banger.artist,
            album=banger.album,
            text=post.text,
            date=post.date,
            like_count=post.like_count
        )

    def get_all(self) -> Union[List[PostOut], Error]:
        posts = get_all_posts()
        post_outs = []

        for post in posts:
            user = get_user(post.user_id)
            banger = get_banger(post.banger_id)

            post_outs.append(
                PostOut(
                    id=post.id,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username,
                    banger_id=banger.id,
                    song_title=banger.song_title,
                    artist=banger.artist,
                    album=banger.album,
                    text=post.text,
                    date=post.date,
                    like_count=post.like_count
                )
            )

        return post_outs

    def get_one(self, post_id: int) -> Union[PostOut, Error]:
        post = get_post(post_id)
        user = get_user(post.user_id)
        banger = get_banger(post.banger_id)

        return PostOut(
                    id=post.id,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username,
                    banger_id=banger.id,
                    song_title=banger.song_title,
                    artist=banger.artist,
                    album=banger.album,
                    text=post.text,
                    date=post.date,
                    like_count=post.like_count
                )

    def update(
            self,
            account: Account,
            post_id: int,
            post_in: PostIn
            ) -> Union[PostOut, Error]:
        post = update_post(post_id, post_in.banger_id, post_in.text)
        user = get_user(post.user_id)
        banger = get_banger(post.banger_id)

        if user.id != account.user_id:
            return Error(message="User does not have permission to edit")

        return PostOut(
                    id=post.id,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username,
                    banger_id=banger.id,
                    song_title=banger.song_title,
                    artist=banger.artist,
                    album=banger.album,
                    text=post.text,
                    date=post.date,
                    like_count=post.like_count
                )

    def delete(self, account: Account, post_id: int) -> Union[bool, Error]:
        post = get_post(post_id)
        user = get_user(post.user_id)

        if user.id != account.user_id:
            return Error(message="User does not have permission to delete")

        delete_post(post_id)

        return True

    def like(self, post_id: int) -> Union[PostOut, Error]:
        post = like_post(post_id)
        user = get_user(post.user_id)
        banger = get_banger(post.banger_id)

        return PostOut(
                    id=post.id,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    username=user.username,
                    banger_id=banger.id,
                    song_title=banger.song_title,
                    artist=banger.artist,
                    album=banger.album,
                    text=post.text,
                    date=post.date,
                    like_count=post.like_count
                )
