import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [fetchTrending, fetchSearchResults] = useGiphy();
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<Error | IGif[]>();
  const [searchResults, setSearchResults] = useState<Error | IGif[]>();
  const [selectedGif, setSelectedGif] = useState<IGif>();
  const [isGifInfoModalOpen, setIsGifInfoModalOpen] = useState(false);

  const showGifInfo = (item: IGif) => {
    setSelectedGif(item);
    setIsGifInfoModalOpen(true);
  };

  const closeModal = () => {
    setIsGifInfoModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", closeModal, false);

    return () => {
      document.removeEventListener("keydown", closeModal, false);
    };
  }, []);

  useEffect(() => {
    searchInputRef.current?.focus();

    const getTrending = async () => {
      setTrending(await fetchTrending());
      setIsLoading(false);
    };

    getTrending();
  }, [fetchTrending]);

  useEffect(() => {
    const searchQueryFromUrl = searchParams.get("q");
    if (searchQueryFromUrl) {
      setSearchQuery(searchQueryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ q: searchQuery });
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setSearchResults(trending);
      setIsLoading(false);

      return;
    }

    const getSearchResults = async () => {
      setIsLoading(true);
      setSearchResults(undefined);
      setSearchResults(await fetchSearchResults(debouncedSearchQuery));
      setIsLoading(false);
    };

    getSearchResults();
  }, [debouncedSearchQuery, fetchSearchResults, trending]);

  return (
    <Search
      searchQuery={searchQuery}
      onSearchQueryChange={(query) => setSearchQuery(query)}
      isLoading={isLoading}
      searchResults={searchResults}
      showGifInfo={showGifInfo}
      selectedGif={selectedGif}
      isTrending={debouncedSearchQuery.length === 0}
      searchInputRef={searchInputRef}
      isGifInfoModalOpen={isGifInfoModalOpen}
      closeModal={closeModal}
    />
  );
};

export { SearchApp };
