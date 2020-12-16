import { genreList } from "./variables";

export default function genreMaker(genreIds: number[]) {
  const genreNameArray = genreIds.map((id) => {
    const found = genreList.movie.find((genre) => genre.id === id);
    return found?.name;
  });

  return genreNameArray.join(", ");
}
