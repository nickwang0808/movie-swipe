export default function getTrailerUrl(videoKey: string | undefined) {
  if (!videoKey) {
    return undefined;
  }
  return `https://www.youtube.com/embed/${videoKey}?rel=0;controls=1;showinfo=0;fs=1;modestbranding=1`;
}
