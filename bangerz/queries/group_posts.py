from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class GroupPostIn(BaseModel):
    group_id: int
    user_id: int
    banger_id: Optional[int]
    content: str
    date: date
    like_count: Optional[int]


class GroupPostOut(BaseModel):
    id: int
    group_id: int
    user_id: int
    banger_id: Optional[int]
    content: str
    date: date
    like_count: Optional[int]


class GroupPostRepository(BaseModel):
    def create(self, g_post: GroupPostIn) -> GroupPostOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO group_posts (
                            group_id,
                            user_id,
                            banger_id,
                            content,
                            date,
                            like_count
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            g_post.group_id,
                            g_post.user_id,
                            g_post.banger_id,
                            g_post.content,
                            g_post.date,
                            g_post.like_count
                        ],
                    )
                    id = result.fetchone()[0]
                    return GroupPostOut(id=id, **g_post.dict())

        except Exception:
            return Error(message="Could not create group post")

    def get_all(self) -> Union[List[GroupPostOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            group_id,
                            user_id,
                            banger_id,
                            content,
                            date,
                            like_count
                        FROM group_posts
                        ORDER BY id;
                        """
                    )
                    return [
                        GroupPostOut(
                            id=data[0],
                            group_id=data[1],
                            user_id=data[2],
                            banger_id=data[3],
                            content=data[4],
                            date=data[5],
                            like_count=data[6]
                        )
                        for data in result
                    ]

        except Exception:
            return Error(message="Could not get all group posts")

    def get_one(self, g_post_id: int) -> Union[GroupPostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            group_id,
                            user_id,
                            banger_id,
                            content,
                            date,
                            like_count
                        FROM group_posts
                        WHERE id = %s
                        """,
                        [g_post_id]
                    )

                    data = db.fetchone()
                    if data:
                        return GroupPostOut(
                            id=data[0],
                            group_id=data[1],
                            user_id=data[2],
                            banger_id=data[3],
                            content=data[4],
                            date=data[5],
                            like_count=data[6]
                        )
                    else:
                        return Error(message="Could not find post")

        except Exception:
            Error(message="Could not retrive group post information")

    def update(
        self,
        g_post_id: int,
        g_post: GroupPostIn
    ) -> Union[GroupPostOut, Error]:
        target_post = self.get_one(g_post_id)
        if target_post.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE group_posts
                            SET
                                group_id = %s,
                                user_id = %s,
                                banger_id = %s,
                                content = %s,
                                date = %s,
                                like_count = %s
                            WHERE id = %s
                            """,
                            [
                                g_post.group_id,
                                g_post.user_id,
                                g_post.banger_id,
                                g_post.content,
                                g_post.date,
                                g_post.like_count,
                                g_post_id
                            ],
                        )

                        return GroupPostOut(id=g_post_id, **g_post.dict())

            except Exception as e:
                print(e)
                return Error(message="Could not update group post")
        else:
            return Error(message="Group post not found")

    def delete(self, g_post_id: int) -> Union[bool, Error]:
        target_post = self.get_one(g_post_id)
        if target_post.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM group_posts
                            WHERE id = %s
                            """,
                            [g_post_id],
                        ),

                        return True

            except Exception:
                return False

        return None
