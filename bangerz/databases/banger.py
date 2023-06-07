from queries.pool import pool
from models.banger import Banger


def get_banger(banger_id: int) -> Banger:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, song_title, artist,
                        album, song_upload, song_img, date
                    FROM bangerz
                    WHERE id = %s
                    """,
                    [banger_id],
                )

                (
                    id,
                    user_id,
                    song_title,
                    artist, album,
                    song_upload,
                    song_img,
                    date
                ) = db.fetchone()

                return Banger(
                    id=id,
                    user_id=user_id,
                    song_title=song_title,
                    artist=artist,
                    album=album,
                    song_upload=song_upload,
                    song_img=song_img,
                    date=date
                )

    except Exception as e:
        raise Exception("Could not get banger: " + str(e))
