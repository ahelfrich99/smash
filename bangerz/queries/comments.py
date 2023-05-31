from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class CommentIn(BaseModel):
    user_id: int
    post_id: int
    content: str
    date: date
    like_count: Optional[int]


class CommentOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    content: str
    date: date
    like_count: Optional[int]


class CommentRepository(BaseModel):
    def create(self, comment: CommentIn) -> CommentOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (user_id, post_id, content, date, like_count)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            comment.user_id,
                            comment.post_id,
                            comment.content,
                            comment.date,
                            comment.like_count,
                        ],
                    )

                    id = result.fetchone()[0]
                    return CommentOut(id=id, **comment.dict())
        except Exception:
            return Error(message="Could not create comment")

    def get_all(self, post_id: int) -> Union[List[CommentOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, post_id, content, date, like_count
                        FROM comments
                        WHERE post_id = %s
                        """,
                        [post_id],
                    )
                    return [
                        CommentOut(
                            id=data[0],
                            user_id=data[1],
                            post_id=data[2],
                            content=data[3],
                            date=data[4],
                            like_count=data[5],
                        )
                        for data in result
                    ]

        except Exception as e:
            print(e)
            return Error(message="Could not get all comments")

    def get_one(self, comment_id: int) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_id, post_id, content, date, like_count
                        FROM comments
                        WHERE ID = %s
                        """,
                        [comment_id],
                    )

                    data = db.fetchone()
                    if data:
                        return CommentOut(
                            id=data[0],
                            user_id=data[1],
                            post_id=data[2],
                            content=data[3],
                            date=data[4],
                            like_count=data[5],
                        )
                    else:
                        return Error(message="Could not find comment")

        except Exception:
            Error(message="Could not retrieve comment information")

    def update(
        self, comment_id: int, comment: CommentIn
    ) -> Union[CommentOut, Error]:
        target_comment = self.get_one(comment_id)
        if target_comment.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE comments
                            SET user_id =%s
                                , post_id = %s
                                , content = %s
                                , date = %s
                                , like_count = %s
                            WHERE id = %s
                            """,
                            [
                                comment.user_id,
                                comment.post_id,
                                comment.content,
                                comment.date,
                                comment.like_count,
                                comment_id,
                            ],
                        )

                        return CommentOut(id=comment_id, **comment.dict())

            except Exception as e:
                print(e)
                return Error(message="Could not update comment")

    def delete(self, comment_id: int) -> Union[bool, Error]:
        target_comment = self.get_one(comment_id)
        if target_comment.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM comments
                            WHERE id = %s
                            """,
                            [comment_id],
                        ),

                        return True

            except Exception:
                return False

        return None
