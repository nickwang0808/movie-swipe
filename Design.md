# Movie Swipe Design

## API design

### Micro Service for getting movies

https://rapidapi.com/gox-ai-gox-ai-default/api/ott-details

a micro service that look at Rapid api and find movies to load into database general movie pool

### Micro Service for watching for matches

a services that look though the liked movies in the groups and find duplicates, once found, inform all parties that liked the duplicates

### Database Design

NoSQL firestore, each user gets own collections, in the collections, there should be an array of liked movies, everybody swipe on a general pool, as soon as like, add it in the liked array,

- Users

  - info: id, {first_name, last_name}
  - liked-movies: movie_title[]
  - Groups: group_id[]

- Group

  - Groupid
    - users: user_id[]
    - liked_movies: Array<user_id[], movie_title>

- Movies
  - genre A movies []
  - genre B movies []
  - genre C movies []
  - ...More

# TODO

- click on like and update database complete

# Note

- when liked a movie, add it to the group, then check if it's the first person to like it, if not create pop up that indicates a match.

everytime
