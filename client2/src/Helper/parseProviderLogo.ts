import { WatchProviders } from "../MovieTypes/IDetialsScreen";

export default function parseProviderLogos(
  provider: WatchProviders | null | undefined
) {
  if (!provider) return null;
  const usProvider = provider.results?.US;
  const buyLogos = usProvider.buy?.map((elem) => elem.logo_path);
  if (buyLogos && buyLogos.length > 0) return buyLogos;
  const rentLogos = usProvider.rent?.map((elem) => elem.logo_path);
  if (rentLogos && rentLogos.length > 0) return rentLogos;

  return null;
}
