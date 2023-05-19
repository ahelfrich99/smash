from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str


class AccountOut(BaseModel):
    id: str
    username: str
    first_name: str
    last_name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries(BaseModel):
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            username,
                            password,
                            first_name,
                            last_name,
                            email
                        FROM users
                        WHERE username = %s
                        """,
                        [username]
                    )
                    records = result.fetchone()
                    if records is None:
                        return None
                    dict = {
                        "id": records[0],
                        "email": records[5],
                        "username": records[1],
                        "hashed_password": records[2],
                        "first_name": records[3],
                        "last_name": records[4],
                    }
                    return dict

        except Exception as e:
            print(e)
            return {"message": "Could not get accounts"}

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
                            email
                            )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            info.username,
                            hashed_password,
                            info.first_name,
                            info.last_name,
                            info.email
                        ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        email=info.email,
                        username=info.username,
                        hashed_password=hashed_password,
                        first_name=info.first_name,
                        last_name=info.last_name
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not create account!"}
