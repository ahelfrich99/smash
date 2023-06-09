from queries.pool import pool
from models.post import Post


def create_post(post: Post) -> Post:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO posts
                        (user_id, banger_id, text, date, like_count)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        post.user_id,
                        post.banger_id,
                        post.text,
                        post.date,
                        post.like_count
                    ],
                )

                id = db.fetchone()
                post.id = id[0]

                return post

    except Exception as e:
        raise Exception("Could not create post: " + str(e))


def get_all_posts() -> Post:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, banger_id, text, date, like_count
                    FROM posts
                    ORDER BY id DESC;
                    """
                )

                posts = db.fetchall()

                return [
                    Post(
                        id=post[0],
                        user_id=post[1],
                        banger_id=post[2],
                        text=post[3],
                        date=post[4],
                        like_count=post[5]
                    )
                    for post in posts
                ]

    except Exception as e:
        raise Exception("Could not get posts: " + str(e))


def get_post(post_id: int) -> Post:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, banger_id, text, date, like_count
                    FROM posts
                    WHERE id = %s
                    """,
                    [post_id],
                )

                id, user_id, banger_id, text, date, like_count = db.fetchone()

                return Post(
                    id=id,
                    user_id=user_id,
                    banger_id=banger_id,
                    text=text,
                    date=date,
                    like_count=like_count
                )

    except Exception as e:
        raise Exception("Could not get post: " + str(e))


def update_post(id: int, banger_id: int, text: str) -> Post:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE posts
                    SET banger_id = %s, text = %s
                    WHERE id = %s
                    """,
                    [
                        banger_id,
                        text,
                        id,
                    ],
                )

                return get_post(id)

    except Exception as e:
        raise Exception("Could not update post: " + str(e))


def delete_post(post_id: int):
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM posts
                    WHERE id = %s
                    """,
                    [post_id],
                ),

    except Exception as e:
        raise Exception("Could not delete post: " + str(e))
