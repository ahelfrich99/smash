from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional
import base64
from fastapi.encoders import jsonable_encoder


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    profile_img: Optional[int]


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    profile_img: Optional[int]


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries(BaseModel):
    def create(
        self,
        info: AccountIn,
        hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            profile_img
                            )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            info.username,
                            hashed_password,
                            info.first_name,
                            info.last_name,
                            info.email,
                            info.profile_img,
                        ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        email=info.email,
                        username=info.username,
                        hashed_password=hashed_password,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        profile_img=info.profile_img,
                    )

        except Exception:
            return {"message": "Could not create account!"}

    def get_all(
        self
    ) -> List[AccountOutWithPassword] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            profile_img
                        FROM users
                        ORDER BY username
                        """
                    )
                    result = db.fetchall()

                    return [
                        AccountOutWithPassword(
                            id=res[0],
                            username=res[1],
                            hashed_password=res[2],
                            first_name=res[3],
                            last_name=res[4],
                            email=res[5],
                            profile_img=res[6],
                        ) for res in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get list of users"}

    def get_one(
        self,
        user_id: int
    ) -> AccountOutWithPassword | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            profile_img
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    data = db.fetchone()
                    if data:
                        profile_img_str = jsonable_encoder(
                            data[6],
                            custom_encoder={
                                bytes: lambda
                                v: base64.b64encode(v).decode('utf-8')})
                        return AccountOutWithPassword(
                            id=data[0],
                            username=data[1],
                            hashed_password=data[2],
                            first_name=data[3],
                            last_name=data[4],
                            email=data[5],
                            profile_img=profile_img_str,
                        )
                    else:
                        return Error(message="Could not find user")

        except Exception:
            return {"message": "Could not retrieve user info"}

    def delete(
        self,
        user_id: int,
        username: str
    ) -> bool | Error:
        target_group = self.get_one(user_id)
        if target_group.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM users
                            WHERE id = %s;
                            """,
                            [
                                user_id
                            ]
                        ),
                        return True

            except Exception:
                return False

        return None

    def get_by_username(
        self,
        username: str
    ) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            profile_img
                        FROM users
                        WHERE username = %s;
                        """,
                        [username]
                    )
                    data = db.fetchone()
                    if data:
                        return AccountOutWithPassword(
                            id=data[0],
                            username=data[1],
                            hashed_password=data[2],
                            first_name=data[3],
                            last_name=data[4],
                            email=data[5],
                            profile_img=data[6],
                        )
        except Exception:
            return Error(message="Could not find user")

        return None

    def update(
            self,
            user_id: int,
            email: Optional[str],
            profile_img: Optional[int]
            ) -> AccountOutWithPassword | Error:
        target_user = self.get_one(user_id)

        if target_user.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE users
                            SET
                            email = %s,
                            profile_img = %s
                            WHERE id = %s
                            """,
                            [email, profile_img, user_id]
                        )
                        return AccountOutWithPassword(
                            id=target_user.id,
                            username=target_user.username,
                            hashed_password=target_user.hashed_password,
                            first_name=target_user.first_name,
                            last_name=target_user.last_name,
                            email=email,
                            profile_img=profile_img
                        )
            except Exception as e:
                print(e)
                return Error(message="Could not update user")
        else:
            return Error(message="User not found")
