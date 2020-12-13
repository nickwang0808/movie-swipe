import { store } from "../store";

export const likedDislikedWatched = () => {
  const { uid } = store.getState().firebase.auth;
  return [
    {
      collection: "users",
      doc: uid,
      subcollections: [
        {
          collection: "Liked",
        },
      ],
      storeAs: "LikedMovies",
    },
    {
      collection: "users",
      doc: uid,
      subcollections: [
        {
          collection: "Disliked",
        },
      ],
      storeAs: "DislikedMovies",
    },
    {
      collection: "users",
      doc: uid,
      subcollections: [
        {
          collection: "Watched",
        },
      ],
      storeAs: "WatchedMovies",
    },
  ];
};
