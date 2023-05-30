steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
        ALTER COLUMN profile_img TYPE BYTEA USING profile_img::bytea;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE users
        ALTER COLUMN profile_img TYPE VARCHAR(500) USING encode(profile_img, 'escape');
        """,
    ],
    [
        # "Up" SQL statement
        """
        ALTER TABLE bangerz
        ALTER COLUMN song_img TYPE BYTEA USING song_img::bytea;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE bangerz
        ALTER COLUMN song_img TYPE VARCHAR(500) USING encode(song_img, 'escape');
        """,
    ],
    [
        # "Up" SQL statement
        """
        ALTER TABLE bangerz
        ADD COLUMN song_upload BYTEA;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE bangerz
        DROP COLUMN song_upload;
        """,
    ],
    [
        # "Up" SQL statement
        """
        ALTER TABLE posts
        ADD COLUMN date DATE NOT NULL;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE posts
        DROP COLUMN date;
        """,
    ],
    [
        # "Up" SQL statement
        """
        ALTER TABLE groups
        ALTER COLUMN picture_url TYPE BYTEA USING picture_url::bytea;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE groups
        ALTER COLUMN picture_url TYPE VARCHAR(500) USING encode(picture_url, 'escape');
        """,
    ],
    [
        # "Up" SQL statement
        """
        ALTER TABLE groups
        RENAME COLUMN picture_url TO group_img;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE groups
        RENAME COLUMN group_img TO picture_url;
        """,
    ],
]
