from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import date

class Error(BaseModel):
    message: str

class GroupCommentIn(BaseModel):
    group_id: int
    user_id: int
    post_id: int
    content: str
    date: date
    like_count: Optional[int]



class GroupCommentOut(BaseModel):
    id: int
    group_id: int
    user_id: int
    post_id: int
    content: str
    date: date
    like_count: int

class GroupCommentRepository:
    def create(self, g_comment: GroupCommentIn) -> Union[GroupCommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO homies
                            (group_id, user_id, post_id, content, date, like_count )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            g_comment.group_id,
                            g_comment.user_id,
                            g_comment.post_id,
                            g_comment.content,
                            g_comment.date,
                            g_comment.like_count,
                        ]
                    )
                    result = db.fetchone()
                    if result:
                        return GroupCommentOut(
                            group_id=result[0],
                            user_id=result[1],
                            post_id=result[2],
                            content=result[3],
                            date_id=result[4],
                            like_count=result[5],
                        )
                    else:
                        return Error(message="Could not create comment")

        except Exception:
            return {"message: COuld not create comment"}



    def increment_like_count(self, group_id: int, user_id: int, post_id: int) -> Union[GroupCommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE group_comments
                        SET like_count = like_count + 1
                        WHERE group_id = %s AND user_id = %s AND post_id = %s
                        RETURNING group_id, user_id, post_id, content, date, like_count;
                        """,
                        [group_id, user_id, post_id]
                    )
                    result = db.fetchone()
                    if result:
                        return GroupCommentOut(
                            group_id=result[0],
                            user_id=result[1],
                            post_id=result[2],
                            content=result[3],
                            date=result[4],
                            like_count=result[5],
                        )
                    else:
                        return Error(message="Could not increment like count")
        except Exception as e:
            return Error(message=f"Could not increment like count, error: {str(e)}")
