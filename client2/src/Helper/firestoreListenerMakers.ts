import { store } from "../store";

export const likedAndDislikedIds = () => {
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
      storeAs: "LikedMovieIds",
    },
    {
      collection: "users",
      doc: uid,
      subcollections: [
        {
          collection: "Disliked",
        },
      ],
      storeAs: "DislikedMovieIds",
    },
  ];
};
