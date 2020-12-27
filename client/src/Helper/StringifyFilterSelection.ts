import { SelectMovies, SelectTvs } from "../redux/Profile/profileReducer";

export function StringifyFilterSelection(input: SelectTvs | SelectMovies) {
  try {
    const stringify = `${input.media},${input.catagories}`;
    return stringify;
  } catch {
    return "movie,popular";
  }
}
export function objectifyFilterSelection(
  input: string
): SelectTvs | SelectMovies {
  const arr = input.split(",");
  const objectify = {
    media: arr[0],
    catagories: arr[1],
  };

  return objectify as SelectTvs | SelectMovies;
}
