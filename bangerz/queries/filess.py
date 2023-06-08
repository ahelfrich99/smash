from pydantic import BaseModel
from queries.pool import pool
from base64 import b64encode
from typing import Union


class Error(BaseModel):
    message: str


class FileIn(BaseModel):
    file_type: str


class FileOut(BaseModel):
    id: int
    file_type: str
    file_data: bytes


class FileRepository:
    def create(self, file: FileIn, file_data: bytes) -> FileOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO files (
                            file_type,
                            file_data
                            )
                        VALUES
                            (%s, %s)
                        RETURNING ID;
                        """,
                        [
                            file.file_type,
                            file_data
                        ]
                    )
                    id = result.fetchone()[0]
                    return FileOut(
                        id=id,
                        file_type=file.file_type,
                        file_data=b64encode(file_data).decode()
                        )
        except Exception:
            return {"message": "Could not create file"}

    def get_one(self, file_id: int) -> Union[FileOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                            , file_type
                            , file_data
                        from files
                        where id = %s
                        """,
                        [file_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return Error(message="File not found")

                    return FileOut(
                        id=record[0],
                        file_type=record[1],
                        file_data=b64encode(record[2]).decode()
                    )
        except Exception:
            return {"message": "Could not get file"}
