export default function getTrailerUrl(videoKey: string | undefined) {
  if (!videoKey) {
    return undefined;
  }
  return `https://www.youtube.com/embed/${videoKey}?rel=0&;autoplay=1&;modestbranding=1&;mute=1`;
}
