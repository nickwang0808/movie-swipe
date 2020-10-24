const fetch = require("node-fetch");

import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getMovies = functions.https.onRequest(async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=e821b059327065b0674050c83b57cba0&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=100&primary_release_year=2020";
  const response = await fetch(url).then((response: any) => response.json());
  console.log(response);
});
