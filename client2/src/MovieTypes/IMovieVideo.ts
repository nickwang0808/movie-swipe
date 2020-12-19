export interface IMovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: "YouTube" | "Vimeo";
  size: 720;
  type:
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers";
}
