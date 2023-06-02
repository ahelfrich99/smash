steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE files (
            id SERIAL PRIMARY KEY NOT NULL,
            file_data BYTEA NOT NULL,  -- Use BLOB if MySQL is being used
            file_type VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE files;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(300) NOT NULL,
            password VARCHAR(300) NOT NULL,
            first_name VARCHAR(300) NOT NULL,
            last_name VARCHAR(300) NOT NULL,
            email VARCHAR(300) NOT NULL,
            profile_img INT REFERENCES files(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE bangerz (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SERIAL NOT NULL REFERENCES USERS(ID),
            song_title VARCHAR(500) NOT NULL,
            artist VARCHAR(500) NOT NULL,
            album VARCHAR(500),
            song_upload INT REFERENCES files(id),
            song_img INT REFERENCES files(id),
            date DATE NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE bangerz;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SERIAL NOT NULL REFERENCES USERS(ID),
            banger_id SERIAL REFERENCES BANGERZ(ID),
            text TEXT NOT NULL,
            date Date Not NULL,
            like_count INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SERIAL NOT NULL REFERENCES USERS(ID),
            post_id SERIAL NOT NULL REFERENCES POSTS(ID),
            content TEXT NOT NULL,
            date DATE NOT NULL,
            like_count INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE groups (
            id SERIAL PRIMARY KEY NOT NULL,
            group_name VARCHAR(50) NOT NULL,
            group_size INT NOT NULL,
            group_img INT REFERENCES files(id),
            description TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE groups;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE group_posts (
            id SERIAL PRIMARY KEY NOT NULL,
            group_id SERIAL NOT NULL,
            user_id SERIAL NOT NULL REFERENCES USERS(ID),
            banger_id SERIAL REFERENCES BANGERZ(ID),
            content TEXT NOT NULL,
            date DATE NOT NULL,
            like_count INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE group_posts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE group_comments (
            id SERIAL PRIMARY KEY NOT NULL,
            group_id SERIAL NOT NULL REFERENCES GROUPS(ID),
            user_id SERIAL NOT NULL REFERENCES USERS(ID),
            post_id SERIAL NOT NULL REFERENCES POSTS(ID),
            content TEXT NOT NULL,
            date DATE NOT NULL,
            like_count INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE group_comments;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE homies (
        user_id INT,
        homie_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (homie_id) REFERENCES users(id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE homies;
        """,
    ],

]
