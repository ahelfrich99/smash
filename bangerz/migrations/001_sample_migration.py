steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) NOT NULL,
            avatar_img TEXT NOT NULL,
            text TEXT NOT NULL,
            song VARCHAR(200) NOT NULL,
            artist VARCHAR(200) NOT NULL,
            album_img VARCHAR(200) NOT NULL,
            likes INT NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            post_id INT NOT NULL,
            username VARCHAR(200) NOT NULL,
            profile_img VARCHAR(200) NOT NULL,
            comment TEXT NOT NULL,
            FOREIGN KEY (post_id) REFERENCES posts (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ]
]
