import { WatchProviders } from "../MovieTypes/ExtendedMovieDetails";

export default function parseProviderLogos(
  provider: WatchProviders | null | undefined
) {
  try {
    if (!provider) return null;

    const usProvider = provider.results?.US;
    const buyLogos = usProvider.buy?.map((elem) => elem.logo_path);
    if (buyLogos && buyLogos.length > 0) return buyLogos;
    const rentLogos = usProvider.rent?.map((elem) => elem.logo_path);
    if (rentLogos && rentLogos.length > 0) return rentLogos;

    return null;
  } catch {
    return null;
  }
}
