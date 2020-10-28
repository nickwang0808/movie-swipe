import { firestore } from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

/*
This code looks thought the groups and find any movies that have more than one 
user that liked a movie, returns the array of user except the current user 
*/

// TODO: need to get this code to server side I guess
// every time a user like a movie, run this code and update everyone also liked the movie
interface ICommonInterest {
  movie_title: string;
  users: string[];
}

export default function useWatchForMatches(
  user: firestore.DocumentData | undefined
) {
  const [matchedUsers, setMatchedUsers] = useState([""]);

  let commonInterest: ICommonInterest[] = [];

  useEffect(() => {
    if (user) {
      const currentGroupsIDs: string[] = user.groups;
      currentGroupsIDs.forEach((groupId) => {
        const groupRef = db.collection("Groups").doc(groupId);
        groupRef.get().then((doc) => {
          if (doc.exists) {
            const docData = doc.data();
            if (docData) {
              docData.liked_movies.forEach((movie: any) => {
                const usersLikedThisMovie = movie.users;
                if (usersLikedThisMovie.length > 1) {
                  // TODO: should update the common interest to db
                  commonInterest = [
                    ...commonInterest,
                    usersLikedThisMovie.filter(
                      (userId: string) => userId !== user.id
                    ),
                  ];
                }
              });
            }
          } else {
            console.log("no suck doc");
          }
        });
      });
    }
  }, [user]);

  return matchedUsers;
}
