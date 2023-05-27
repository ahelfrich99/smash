steps = [
    [
        """
        ALTER TABLE users
        ALTER COLUMN profile_img TYPE BYTEA;
        """
    ],
    [
        """
        ALTER TABLE bangerz
        ALTER COLUMN song_img TYPE BYTEA
        ALTER COLUMN song_upload TYPE BYTEA;
        """
    ],
    [
        """
        ALTER TABLE posts
        ADD date DATE NOT NULL;
        """
    ],
    [
        """
        ALTER TABLE groups
        ALTER COLUMN picture_url TYPE BYTEA
        RENAME COLUMN picture_url TO group_img;
        """
    ],
]
