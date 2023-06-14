# SMASH: Social, Music, And Sharing Hub

---

Come find new music, connect with friends, and share your creations!

- Adrianna Helfrich
- Andrew Lam
- Joon Hyuk Brandon Jang
- Kristen Lungstrum

## Intended Market

We want to target users from social media and music backgrounds. We want to provide an experience where users can come connect with
other users, share their own productions, and manage meetups with groups through the app.

## Design

- [API design](docs/apis.md)
- [GHI](docs/ghi.md)

## Functionality

- Home Page Functionality
    - users can view a feed of posts
    - users can create a post and attach a "banger" to reference in it
    - users can delete a post that they made
    - users can comment on a post
    - users can listen to bangers attached to songs through the music player within the post

- Bangerz Page Functionality
    - users can create a banger by filling out the form with the banger details
    - users can view a list of their created bangerz
    - users can play and listen to each individual banger in the list
    - users can delete a banger

- Group Page Functionality
    - users can view a list of groups
    - users can click on a group picture to go to the group's profile page
    - users can create a group through the create function

- Group Profile Page Functionality
    - users can view group profile and the info on the group card
    - users can see the group's posts on the right hand side in column format
    - users can create a group post through the profile page for the group
    - users can play the banger attached to the group post

- Group Post Page Functionality
    - users can view a list of all group posts
    - users can create a group post and specifiy which group to create the post for
    - users can play bangers on the group post on the list

## Project Initialization

To enjoy the full experience of our application on your local machine, please follow the steps below for set up:

1. Clone the repository into a directory of choice
2. `cd` into the new cloned project directory
3. Run the following commands in your project directory terminal to build docker image and container

    ```sh
    docker volume create bangerz
    docker-compose build
    docker-compose up
    ```

4. Once the docker containers are running, go to http://localhost:3000 to experience the application
