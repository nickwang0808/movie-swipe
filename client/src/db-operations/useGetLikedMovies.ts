import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export default function useGetLikedMovies(userID: string) {
  const [likedMoviesInfos, setLikedMoviesInfos] = useState<MovieDetail[]>([]);

  useEffect(() => {
    if (userID) {
      const searchMovieByID = async (ID: number) => {
        const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
        const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
        const response: MovieDetail = await fetch(url).then((res) =>
          res.json()
        );
        return response;
      };

      const userRef = db
        .collection("Users")
        .doc(userID)
        .collection("User_Details")
        .doc("Liked_Movies")
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              // here we take the fetched id and get the actual movie data
              const tempArray: MovieDetail[] = [];
              data.liked_movies.forEach(async (movieID: number) => {
                const movieDetails = await searchMovieByID(movieID);
                tempArray.unshift(movieDetails);
              });
              setLikedMoviesInfos(tempArray);
            } else {
              console.log("doc not found");
            }
          }
        });

      return () => userRef();
    }
  }, [userID]);

  return likedMoviesInfos;
}
