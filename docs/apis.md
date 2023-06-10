# APIs

## Bangerz

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz`,

- **Methods**: `POST`, `GET`, `GET`, `PUT`, `DELETE`

    - `POST` - will allow user to create a new banger by filling in the user id, song title, artist, album, song image, song file, and date

    - `GET` - will retrieve a list of all bangerz

    - `GET` - will retrieve a specific banger by it's id

    - `DELETE` - will delete a specific banger by it's id

    - `PUT` - will update a specific banger by it's id with matching inputs

    ### Method: `POST`

    Input:

    ```json
    {
        "user_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "song_img": int,
        "song_upload": int,
        "date": string
    }
    ```

    Output:

    ```json
    {
        "id": id,
        "user_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "song_img": int,
        "song_upload": int,
        "date": string
    }
    ```

    ### Method: `PUT`

    Provide a banger id

    Input:

    ```json
    {
        "user_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "song_img": int,
        "song_upload": int,
        "date": string
    }
    ```

    Output:

    ```json
    {
        "id": id,
        "user_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "song_img": int,
        "song_upload": int,
        "date": string
    }
    ```

## Posts

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz/posts`, `/bangerz/posts/(id)`

- **Methods**: `POST`, `GET`, `GET`, `PUT`, `DELETE`

    - `POST` - user can create a new post

    - `GET` - will retrieve a list of all posts

    - `GET` - will retrieve a single post

    - `DELETE` - will delete a single post

    - `PUT` - will update a single post

    ### Method: `POST`

    Input:

    ```json
    {
        "banger_id": int,
        "text": string
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "first_name": string,
        "last_name": string,
        "username": string,
        "banger_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "text": string,
        "date": date,
        "like_count": int
    }
    ```

    ### Method: `PUT`

    - Provided a post id

    Input:

    ```json
    {
        "banger_id": int,
        "text": string
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "first_name": string,
        "last_name": string,
        "username": string,
        "banger_id": int,
        "song_title": string,
        "artist": string,
        "album": string,
        "text": string,
        "date": date,
        "like_count": int
    }
    ```

## Comments

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz/posts/(id)/comments`

- **Methods**: `POST`, `GET`, `DELETE`

    - `POST` - will allow user to create a new comment on a specific post

    - `GET` - will retrieve a list of all comments on a specific post

    - `DELETE` - will delete a specified comment by id

    ### Method: `POST`

    Input:

    ```json
    {
        "post_id": int,
        "content": string
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_id": int,
        "user_id": int,
        "banger_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

## Groups

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz/groups`, `/bangerz/groups/(id)`

- **Methods**: `POST`, `GET`, `GET`, `PUT`, `DELETE`

    - `POST` - will allow user to create a new group by filling in the group name, group size, group image, and description

    - `GET` - will retrieve a list of all groups

    - `GET` - will retrieve a group with specific details of the group

    - `DELETE` - will delete a specified group by id

    - `PUT` - will update a specified group by id with matching inputs

    ### Method: `POST`

    Input:

    ```json
    {
        "group_name": string,
        "group_size": int,
        "group_img": int,
        "description": string
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_name": string,
        "group_size": int,
        "group_img": int,
        "description": string
    }
    ```

    ### Method: `PUT`

    - Provided a group id

    Input:

    ```json
    {
        "group_name": string,
        "group_size": int,
        "group_img": int,
        "description": string
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_name": string,
        "group_size": int,
        "group_img": int,
        "description": string
    }
    ```

## Group Posts

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz/group_posts`, `/bangerz/group_posts/(id)`

- **Methods**: `POST`, `GET`, `GET`, `PUT`, `DELETE`

    - `POST` - will allow user to create a new group post by providing the group id, user id, and banger id, and filling in the content and date

    - `GET` - will retrieve a list of all group posts

    - `GET` - will retrieve a group post with specific details of the group post

    - `DELETE` - will delete a specified group post by id

    - `PUT` - will update a specified group post by id with matching inputs

    ### Method: `POST`

    Input:

    ```json
    {
        "group_id": int,
        "user_id": int,
        "banger_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_id": int,
        "user_id": int,
        "banger_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    ### Method: `PUT`

    Provided a group post id

    Input:

    ```json
    {
        "group_id": int,
        "user_id": int,
        "banger_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_id": int,
        "user_id": int,
        "banger_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

## Group Comments

- **URL**: `http://localhost:8000`

- **Path**: `/bangerz/group_posts(id)/group_comments`, `/bangerz/group_posts/(id)/group_comments/(id)`

- **Methods**: `POST`, `GET`, `GET`, `PUT`, `DELETE`

    - `POST` - will allow user to create a new group post comment by providing the group id, user id, and group post id, and filling in the content, and date

    - `GET` - will retrieve a list of all group post comments

    - `GET` - will retrieve a group post comment with specific details of the group post comment

    - `DELETE` - will delete a specified group post comment by id

    - `PUT` - will update a specified group post comment by id with matching inputs

    ### Method: `POST`

    Input:

    ```json
    {
        "group_id": int,
        "user_id": int,
        "group_post_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_id": int,
        "user_id": int,
        "group_post_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    ### Method: `PUT`

    Provided a group post comment id

    Input:

    ```json
    {
        "group_id": int,
        "user_id": int,
        "group_post_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }
    ```

    Output:

    ```json
    {
        "id": int,
        "group_id": int,
        "user_id": int,
        "group_post_id": int,
        "content": string,
        "date": date,
        "like_count": int
    }

## Accounts

- Get Accounts `GET` http://localhost:8000/accounts/
- Create All Accounts `POST` http://localhost:8000/accounts/
- Get One Accounts `GET` http://localhost:8000/accounts/:id
- Delete Accounts `DELETE` http://localhost:8000/accounts/:id
- Update Accounts `PUT` http://localhost:8000/accounts/:id

    ### Method: `GET`

    ```json
    {
        "id": 1,
        "username": "Awst",
        "first_name": "Andrew",
        "last_name": "Kai",
        "email": "andrew2@gmail.com",
        "profile_img": "1"
    }
    ```

    ### Method: `POST`

    ```json
    {
        "username": "Awst",
		"first_name": "Andrew",
		"last_name": "Kai",
		"email": "andrew2@gmail.com",
		"profile_img": "1"
    }
    ```

## Homies

- Get All homies `GET` http://localhost:8000/homies/
- Create homies `POST` http://localhost:8000/homies/
- Get One ALL homies `GET` http://localhost:8000/homies/:id
- Delete homies `DELETE` http://localhost:8000/homies/:id

    ### Method: `GET`

    ```json
    {
        "user_id": 2,
  		"homie_id": 4
    }
    ```

    ### Method: `POST`

    ```json
    {
        "user_id": 1,
  		"homie_id": 2
    }
    ```

## Files

- Get file `GET` http://localhost:8000/files/:id
- Upload file `POST` http://localhost:8000/files/
- Select a browser in the browser to upload file.
