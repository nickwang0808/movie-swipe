# Movie Swipe Design

## API design

### Micro Service for getting movies

https://rapidapi.com/gox-ai-gox-ai-default/api/ott-details

a micro service that look at Rapid api and find movies to load into database general movie pool

### Micro Service for watching for matches

a service that looks for any matches on the database, if found, then update the match pool which then inform user about the match

### Database Design

NoSQL firestore, each user gets own collections, in the collections, there should be an array of liked movies, everybody swipe on a general pool, as soon as like, add it in the liked array,

- Users

  - liked movies []
  - friends []

- Movies
  - genre A movies []
  - genre B movies []
  - genre C movies []
  - ...More
