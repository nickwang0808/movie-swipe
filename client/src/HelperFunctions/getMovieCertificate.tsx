import { MovieDetail } from "../APICalls/searchMovieByID";

const getMovieCertificate = (movieDetails: MovieDetail | undefined) => {
  if (movieDetails) {
    const US_movieCerts = movieDetails.release_dates.results.find(
      (cert) => cert.iso_3166_1 === "US"
    );
    if (US_movieCerts) {
      return US_movieCerts.release_dates[0].certification;
    } else {
      return "G";
    }
  }
  return undefined;
};

export default getMovieCertificate;
