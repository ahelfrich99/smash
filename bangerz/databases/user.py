from queries.pool import pool
from models.user import User


def get_user(user_id: int) -> User:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, username, password, first_name,
                        last_name, email, profile_img
                    FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )

                (
                    id,
                    username,
                    password,
                    first_name,
                    last_name,
                    email,
                    profile_img
                ) = db.fetchone()

                return User(
                    id=id,
                    username=username,
                    password=password,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    profile_img=profile_img,
                )

    except Exception as e:
        raise Exception("Could not get user: " + str(e))
