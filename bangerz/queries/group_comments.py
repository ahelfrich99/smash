from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class GroupCommentIn(BaseModel):
    group_id: int
    user_id: int
    group_post_id: int
    content: str
    date: date
    like_count: Optional[int]


class GroupCommentOut(BaseModel):
    id: int
    group_id: int
    user_id: int
    group_post_id: int
    content: str
    date: date
    like_count: int


class GroupCommentRepository(BaseModel):
    def create(
        self,
        group_comment: GroupCommentIn
    ) -> Union[GroupCommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO group_comments (
                            group_id,
                            user_id,
                            group_post_id,
                            content,
                            date,
                            like_count
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            group_comment.group_id,
                            group_comment.user_id,
                            group_comment.group_post_id,
                            group_comment.content,
                            group_comment.date,
                            group_comment.like_count,
                        ]
                    )
                    id = result.fetchone()[0]
                    return GroupCommentOut(id=id, **group_comment.dict())

        except Exception as e:
            raise Exception("Could not create comment" + str(e))

    def get_all(
        self,
        group_post_id: int
    ) -> Union[List[GroupCommentOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            group_id,
                            user_id,
                            group_post_id,
                            content,
                            date,
                            like_count
                        FROM group_comments
                        WHERE group_post_id = %s
                        """,
                        [group_post_id],
                    )
                    return [
                        GroupCommentOut(
                            id=data[0],
                            group_id=data[1],
                            user_id=data[2],
                            group_post_id=data[3],
                            content=data[4],
                            date=data[5],
                            like_count=data[6],
                        )
                        for data in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get all group comments")

    def get_one(self, g_comment_id: int) -> Union[GroupCommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            group_id,
                            user_id,
                            group_post_id,
                            content,
                            date,
                            like_count
                        FROM group_comments
                        WHERE id = %s
                        """,
                        [g_comment_id],
                    )

                    data = db.fetchone()
                    if data:
                        return GroupCommentOut(
                            id=data[0],
                            group_id=data[1],
                            user_id=data[2],
                            group_post_id=data[3],
                            content=data[4],
                            date=data[5],
                            like_count=data[6],
                        )
                    else:
                        return Error(message="Could not find group comment")

        except Exception:
            Error(message="Could not retrieve group comment information")

    def update(
        self, g_comment_id: int, group_comment: GroupCommentIn
    ) -> Union[GroupCommentOut, Error]:
        target_comment = self.get_one(g_comment_id)
        if target_comment.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE group_comments
                            SET user_id =%s
                                , group_post_id = %s
                                , content = %s
                                , date = %s
                                , like_count = %s
                            WHERE id = %s
                            """,
                            [
                                group_comment.user_id,
                                group_comment.group_post_id,
                                group_comment.content,
                                group_comment.date,
                                group_comment.like_count,
                                g_comment_id,
                            ],
                        )

                        return GroupCommentOut(
                            id=g_comment_id, **group_comment.dict())

            except Exception as e:
                print(e)
                return Error(message="Could not update group comment")

        else:
            return Error(message="Group post not found")

    def increment_like_count(self, g_comment_id: int) -> Union[bool, Error]:
        target_comment = self.get_one(g_comment_id)
        if target_comment.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE group_comments
                            SET like_count = like_count + 1
                            WHERE id = %s
                            """,
                            [g_comment_id],
                        ),

                        return True

            except Exception:
                return False

        return None

    def delete(self, g_comment_id: int) -> Union[bool, Error]:
        target_comment = self.get_one(g_comment_id)
        if target_comment.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM group_comments
                            WHERE id = %s
                            """,
                            [g_comment_id],
                        ),

                        return True

            except Exception:
                return False

        return None
