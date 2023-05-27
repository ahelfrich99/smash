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
    like_count: Optional[int]



class GroupCommentOut(BaseModel):
    group_id: int
    user_id: int
    post_id: int
    content: str
    date: date
    like_count: int

class GroupCommentRepository:
    def create(self, groupComment: GroupCommentIn) -> Union[HomieOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO homies
                            (user_id, homie_id)
                        VALUES
                            (%s, %s)
                        RETURNING user_id, homie_id;
                        """,
                        [
                            homie.user_id,
                            homie.homie_id
                        ]
                    )
                    result = db.fetchone()
                    if result:
                        return HomieOut(
                            user_id=result[0],
                            homie_id=result[1]
                        )
                    else:
                        return Error(message="Could not create homie")

        except Exception:
            return {"message: COuld not create homie"}



    def delete(self, homie: HomieIn) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM homies
                        WHERE user_id = %s AND homie_id = %s
                        """,
                        [
                            homie.user_id,
                            homie.homie_id
                        ]
                    )
                    return True

        except Exception as e:
            print(e)
            return False

    def get_all(self) -> Union[Error, List[HomieOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_id, homie_id
                        FROM homies
                        ORDER BY user_id;
                        """
                    )
                    # fetch all records
                    records = db.fetchall()

                    result = []
                    for record in records:
                        homie = HomieOut(
                            user_id=record[0],
                            homie_id=record[1],
                        )
                        result.append(homie)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all homies"}



    def get_one(self, user_id:int) -> Union[Error, List[HomieOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_id, homie_id
                        FROM homies
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    # fetch all records
                    records = db.fetchall()
                    print(records)
                    result = []
                    for record in records:
                        homie = HomieOut(
                            user_id=record[0],
                            homie_id=record[1],
                        )
                        result.append(homie)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get homie"}
