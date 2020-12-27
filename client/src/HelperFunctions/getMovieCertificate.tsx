import { MovieDetail } from "../APICalls/searchMovieByID";

const getMovieCertificate = (movieDetails: MovieDetail | undefined) => {
  if (movieDetails) {
    const FInd_US_movieCerts = movieDetails.release_dates.results.find(
      (cert) => cert.iso_3166_1 === "US"
    );
    const US_movieCerts = FInd_US_movieCerts?.release_dates[0].certification;
    if (US_movieCerts && US_movieCerts !== "") {
      return US_movieCerts;
    } else {
      return "G";
    }
  }
  return undefined;
};

export default getMovieCertificate;
