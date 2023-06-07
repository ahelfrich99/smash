from queries.pool import pool
from models.comment import Comment


def create_comment(comment: Comment) -> Comment:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO comments
                        (user_id, post_id, content, date, like_count)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        comment.user_id,
                        comment.post_id,
                        comment.content,
                        comment.date,
                        comment.like_count
                    ],
                )

                id = db.fetchone()
                comment.id = id[0]

                return comment

    except Exception as e:
        raise Exception("Could not create comment: " + str(e))


def get_all_comments(post_id: int) -> Comment:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, post_id, content, date, like_count
                    FROM comments
                    WHERE post_id = %s
                    """,
                    [post_id],
                )

                comments = db.fetchall()

                return [
                    Comment(
                        id=comment[0],
                        user_id=comment[1],
                        post_id=comment[2],
                        content=comment[3],
                        date=comment[4],
                        like_count=comment[5]
                    )
                    for comment in comments
                ]

    except Exception as e:
        raise Exception("Could not get comments: " + str(e))


def get_comment(comment_id: int) -> Comment:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        id, user_id, post_id, content, date, like_count
                    FROM comments
                    WHERE id = %s
                    """,
                    [comment_id],
                )

                id, user_id, post_id, content, date, like_count = db.fetchone()

                return Comment(
                    id=id,
                    user_id=user_id,
                    post_id=post_id,
                    content=content,
                    date=date,
                    like_count=like_count
                )

    except Exception as e:
        raise Exception("Could not get comment: " + str(e))


def delete_comment(comment_id: int):
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM comments
                    WHERE id = %s
                    """,
                    [comment_id],
                ),

    except Exception as e:
        raise Exception("Could not delete comment: " + str(e))
