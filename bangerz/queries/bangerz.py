from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool
import base64
from fastapi.encoders import jsonable_encoder


class Error(BaseModel):
    message: str


class BangerIn(BaseModel):
    user_id: int
    song_title: str
    artist: str
    album: Optional[str]
    song_img: Optional[str]
    date: date


class BangerOut(BaseModel):
    id: int
    user_id: int
    song_title: str
    artist: str
    album: Optional[str]
    song_img: Optional[str]
    date: date


class BangerRepository:
    def create(self, banger: BangerIn) -> BangerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO bangerz
                            (user_id, song_title, artist, album, song_img, date)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING ID;
                        """,
                        [banger.user_id, banger.song_title, banger.artist, banger.album, banger.song_img, banger.date]
                    )
                    id = result.fetchone()[0]
                    return BangerOut(id=id, **banger.dict())
        except Exception:
            return {"message": "Could not create banger"}

    def get_all(self) -> Union[List[BangerOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id, user_id, song_title, artist, album, song_img, date
                        from bangerz
                        order by date;
                        """
                    )
                    return [
                        BangerOut(
                            id=record[0],
                            user_id=record[1],
                            song_title=record[2],
                            artist=record[3],
                            album=record[4],
                            song_img=record[5],
                            date=record[6],
                        )
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not list bangerz"}

    def update(self, banger_id: int, banger: BangerIn) -> Union[BangerOut, Error]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            update bangerz
                            set user_id = %s
                                , song_title = %s
                                , artist = %s
                                , album = %s
                                , song_img = %s
                                , date = %s
                            where id = %s
                            """,
                            [
                                banger.user_id,
                                banger.song_title,
                                banger.artist,
                                banger.album,
                                banger.song_img,
                                banger.date,
                                banger_id
                            ]
                        )

                        if db.rowcount == 0:
                            return Error(message= "Banger not found")

                        return BangerOut(id=banger_id, **banger.dict())
            except Exception:
                return {"message": "Could not update banger"}

    def delete(self, banger_id: int) -> Union[bool, Error]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            delete from bangerz
                            where id = %s
                            """,
                            [banger_id]
                        )
                        if db.rowcount == 0:
                            return Error(message="Banger not found")

                        return True
            except Exception:
                return Error(message="Could not delete banger")

    def get_one(self, banger_id: int) -> Union[BangerOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        select id
                            , user_id
                            , song_title
                            , artist
                            , album
                            , song_img
                            , date
                        from bangerz
                        where id = %s
                        """,
                        [banger_id]
                    )
                    record = result.fetchone()
                    if record:
                        song_img_str = jsonable_encoder(record[5], custom_encoder={
                            bytes: lambda v: base64.b64encode(v).decode('utf-8')})

                    if record is None:
                        return Error(message="Banger not found")

                    return BangerOut(
                        id=record[0],
                        user_id=record[1],
                        song_title=record[2],
                        artist=record[3],
                        album=record[4],
                        song_img=song_img_str,
                        date=record[6]
                    )
        except Exception:
            return {"message": "Could not get banger"}
