import { ReleaseDates } from "../MovieTypes/IDetialsScreen";

export default function parseCerts(data: ReleaseDates) {
  const found = data.results.find((elem) => elem.iso_3166_1 === "US");
  if (!found) {
    return "G";
  } else {
    const subFound = found.release_dates.find(
      (elem) => elem.certification !== ""
    );
    if (!subFound) {
      return "G";
    } else {
      return subFound.certification;
    }
  }
}
