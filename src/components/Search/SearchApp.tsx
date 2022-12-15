import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { IGif } from "@giphy/js-types";
import { useDebounce } from "../../hooks/useDebounce";
import { useGiphy } from "../../hooks/useGiphy";
import { Search } from "./Search";

/**
 * Giphy search app.
 * Renders the search input, gets the response and
 * passing the results to the results component.
 * @returns React component
 */
const SearchApp: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>();
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [fetchTrending, fetchSearchResults] = useGiphy();
  const [trending, setTrending] = useState<Error | IGif[]>();
  const [searchResults, setSearchResults] = useState<Error | IGif[]>();

  const getTrending = useCallback(async () => {
    if (!trending) {
      setTrending(await fetchTrending());
    }
  }, [fetchTrending, trending]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      setSearchParams({ q: searchQuery });
    }
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    const getSearchResults = async () => {
      setSearchResults(undefined);

      if (searchQuery === "") {
        await getTrending();
        setSearchResults(trending);
      } else if (debouncedSearchQuery && searchQuery === debouncedSearchQuery) {
        setSearchResults(await fetchSearchResults(debouncedSearchQuery));
      }
    };

    getSearchResults();
  }, [
    debouncedSearchQuery,
    fetchSearchResults,
    getTrending,
    searchQuery,
    trending,
  ]);

  return (
    <Search
      searchQuery={searchQuery}
      onSearchQueryChange={(query) => setSearchQuery(query)}
      searchResults={searchResults}
      isTrending={searchQuery?.length === 0}
    />
  );
};

export { SearchApp };
