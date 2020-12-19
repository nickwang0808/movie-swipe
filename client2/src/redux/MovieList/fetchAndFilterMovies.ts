import { IFetchedMovieListResult, IPopularMovies } from "../../MovieTypes";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { movieListTypes } from "../Profile/profileReducer";

export default async function fetchAndFilterMovies(
  pageNum: number,
  VotedMovies: number[] | null,
  genrePreference: number[],
  currentMovieList: Array<
    IFetchedMovieListResult | IMovieDetailsForDetailsExtended
  >,
  movieListTypePref?: movieListTypes
) {
  const localVoted = GetLocalVoted();
  const votedMovies: number[] = [
    ...(localVoted || []),
    ...(VotedMovies || []),
    ...(currentMovieList.map((elem) => elem.id) || []), // drop this in to prevent weird dupes
  ];

  let localPageNum = pageNum;
  const processedMovieLists: IFetchedMovieListResult[] = [];
  // TODO: something seriously wrong here, infinite loops
  while (processedMovieLists.length + currentMovieList.length <= 4) {
    const fetchedMovies = await fetchPopularMovies(
      localPageNum,
      movieListTypePref
    );
    // filter voted movies out
    fetchedMovies.results.forEach((result) => {
      if (!result.backdrop_path) return; // if movie hs no poster skip
      if (votedMovies.includes(result.id)) return; // if voted skip
      if (genreFiltering(result.genre_ids, genrePreference) === "fail") {
        return; // if filtered in genre, skip
      }
      processedMovieLists.push(result);
    });

    localPageNum++;
  }

  return {
    pageNum: localPageNum,
    processedMovieLists,
  };
}

async function fetchPopularMovies(
  pageNum: number,
  movieListTypePref: movieListTypes = "popular"
) {
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieListTypePref}?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`;
  const response: IPopularMovies = await fetch(url).then((res) => res.json());
  return response;
}

function genreFiltering(
  genreIds: number[],
  userPreference: number[] | undefined
) {
  if (userPreference !== undefined) {
    const result = genreIds.map((genreId) => {
      const found = userPreference.includes(genreId);
      if (found) {
        // true is not allowed
        return "pass";
      } else {
        return "fail";
      }
    });
    if (result.includes("pass")) {
      // no true allowed
      return "pass";
    } else {
      return "fail";
    }
  } else return "pass";
}

function GetLocalVoted() {
  const like = localStorage.getItem("liked_movies");
  const dislike = localStorage.getItem("disliked_movies");

  let voted = "";
  if (like) {
    voted = voted + like;
  }
  if (dislike) {
    voted = voted + dislike;
  }

  if (voted !== "") {
    return voted.split(",").map((elem) => Number(elem));
  } else return null;
}
