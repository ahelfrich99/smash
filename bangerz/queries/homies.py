from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class HomieIn(BaseModel):
    user_id: int
    homie_id: int


class HomieOut(BaseModel):
    user_id: int
    homie_id: int


class HomieRepository:
    def create(self, homie: HomieIn) -> Union[HomieOut, Error]:
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

    def get_one(self, user_id: int) -> Union[Error, List[HomieOut]]:
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
