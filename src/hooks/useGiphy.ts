import { useCallback } from "react";
import type { IGif } from "@giphy/js-types";

// We can move that constants to a separate file if they will be reused,
// but I decided to leave them here for the simplicity
const GIPHY_API_URL = "//api.giphy.com/v1/gifs/";
const GIPHY_API_LIMIT = 10;
// Should be used on the BE side as it can be intercepted and reused by ill-wishers
const { VITE_GIPHY_API_KEY } = import.meta.env;

/**
 * This hook loads the data from the GIPHY API https://developers.giphy.com/docs/api/ .
 * @example
 * const [fetchTrending, fetchSearchResults] = useGiphy();
 * const trendingList = await fetchTrending();
 * const searchResults = await fetchSearchResults("fun");
 * @returns [fetchTrending, fetchSearchResults] - the function to get the trending list {Promise<Gif[]>} and the function to get the search results {Promise<Gif[]>}
 */
const useGiphy = () => {
  const fetchTrending = useCallback(async (): Promise<IGif[] | Error> => {
    try {
      const trendingResponse = await fetch(
        `${GIPHY_API_URL}trending?api_key=${VITE_GIPHY_API_KEY}&limit=${GIPHY_API_LIMIT}`
      );

      if (!trendingResponse.ok) {
        throw new Error(trendingResponse.statusText);
      }

      const trendingJSON = await trendingResponse.json();

      if (trendingJSON.meta.status !== 200 || trendingJSON.meta.msg !== "OK") {
        throw new Error(trendingJSON.meta.msg);
      }

      return trendingJSON.data;
    } catch (error) {
      // Better to automatically log to Sentry or similar solution
      // eslint-disable-next-line no-console -- TODO: Add the proper errors handling
      console.error(`Can't get trending GIFs ${error}`);

      return new Error();
    }
  }, []);

  const fetchSearchResults = useCallback(
    async (searchQuery: string): Promise<IGif[] | Error> => {
      try {
        const trendingResponse = await fetch(
          `${GIPHY_API_URL}search?q=${encodeURIComponent(
            searchQuery
          )}&api_key=${VITE_GIPHY_API_KEY}&limit=${GIPHY_API_LIMIT}`
        );

        if (!trendingResponse.ok) {
          throw new Error(trendingResponse.statusText);
        }

        const trendingJSON = await trendingResponse.json();

        if (
          trendingJSON.meta.status !== 200 ||
          trendingJSON.meta.msg !== "OK"
        ) {
          throw new Error(trendingJSON.meta.msg);
        }

        return trendingJSON.data;
      } catch (error) {
        // Better to automatically log to Sentry or similar solution
        // eslint-disable-next-line no-console -- TODO: Add the proper errors handling
        console.error(`Can't get search results ${error}`);

        return new Error();
      }
    },
    []
  );

  return [fetchTrending, fetchSearchResults] as const;
};

export { useGiphy };
