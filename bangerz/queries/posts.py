from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


# Data that is coming into the app
class PostIn(BaseModel):
    user_id: int
    banger_id: Optional[int]
    text: str
    like_count: Optional[int]
    date: date


# Data being returned by the app
class PostOut(BaseModel):
    id: int
    user_id: int
    banger_id: Optional[int]
    text: str
    like_count: Optional[int]
    date: date

class PostRepository(BaseModel):
    def create(self, post: PostIn) -> PostOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO posts
                            (user_id, banger_id, text, like_count, date)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            post.user_id,
                           ## post.banger_id,
                            post.text,
                            post.like_count,
                            post.date,
                        ],
                    )
                    id = result.fetchone()[0]
                    # return new data
                    return PostOut(id=id, **post.dict())
        except Exception:
            return Error(message="Could not create post")

    def get_all(self) -> Union[List[PostOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # run our SELECT statement
                    # doesn't need the second parameter in the first
                    # one because we are just getting all of them at once
                    result = db.execute(
                        """
                        SELECT id, user_id, banger_id, text, like_count, date
                        FROM posts
                        ORDER BY id;
                        """
                    )
                    return [
                        PostOut(
                            id=data[0],
                            user_id=data[1],
                            banger_id=data[2],
                            text=data[3],
                            like_count=data[4],
                            date=data[5],
                        )
                        for data in result
                    ]

        except Exception:
            return Error(message="Could not get all posts")

    def get_one(self, post_id: int) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_id, banger_id, text, like_count, date
                        FROM posts
                        WHERE id = %s
                        """,
                        [post_id],
                    )

                    data = db.fetchone()
                    if data:
                        return PostOut(
                            id=data[0],
                            user_id=data[1],
                            banger_id=data[2],
                            text=data[3],
                            like_count=data[4],
                            date=data[5],
                        )
                    else:
                        return Error(message="could not find post")

        except Exception:
            Error(message="Could not retrieve post information")

    def update_post(self, post_id: int, post: PostIn) -> Union[PostOut, Error]:
        target_post = self.get_one(post_id)
        if target_post.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE posts
                            SET user_id = %s
                                , banger_id = %s
                                , text = %s
                                , like_count = %s
                                , date = %s
                            WHERE id = %s
                            """,
                            [
                                post.user_id,
                                post.banger_id,
                                post.text,
                                post.like_count,
                                post.date,
                                post_id,
                            ],
                        )

                        return PostOut(id=post_id, **post.dict())

            except Exception:
                return Error(message="Could not update post")
        else:
            return Error(message="Post not found")

    def delete_post(self, post_id: int) -> Union[bool, Error]:
        target_post = self.get_one(post_id)
        if target_post.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM posts
                            WHERE id = %s
                            """,
                            [post_id],
                        ),

                        return True

            except Exception:
                return False

        return None
