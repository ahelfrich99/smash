from models.like import Like
from queries.pool import pool


def create_like(like: Like) -> Like:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO likes
                        (user_id, post_id)
                    VALUES
                        (%s, %s)
                    RETURNING id
                    """,
                    [
                        like.user_id,
                        like.post_id
                    ],
                )

                id = db.fetchone()
                like.id = id[0]

                return like

    except Exception as e:
        raise Exception("Could not create like: " + str(e))


def get_like(like_id: int) -> Like:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, post_id
                    FROM likes
                    WHERE id = %s
                    """,
                    [like_id],
                )

                id, user_id, post_id = db.fetchone()

                return Like(
                    id=id,
                    user_id=user_id,
                    post_id=post_id
                )

    except Exception as e:
        raise Exception("Could not get like: " + str(e))


def delete_like(post_id: int, user_id: int):
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM likes
                    WHERE post_id = %s AND user_id = %s
                    """,
                    [post_id, user_id],
                ),

    except Exception as e:
        raise Exception("Could not delete like: " + str(e))


def get_like_count(post_id: int) -> int:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT COUNT(user_id)
                    FROM likes
                    WHERE post_id = %s
                    """,
                    [post_id],
                ),

                count = int(db.fetchone()[0])

                return count

    except Exception as e:
        raise Exception("Could not get like count: " + str(e))


def post_liked_by_user(post_id: int, user_id: int) -> bool:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    FROM likes
                    WHERE post_id = %s AND user_id = %s
                    """,
                    [post_id, user_id],
                ),

                id = db.fetchone()

                if id is None:
                    return False
                else:
                    return True

    except Exception:
        return False
