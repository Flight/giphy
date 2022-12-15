import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import type { IGif } from "@giphy/js-types";
import { Spinner } from "../Spinner/Spinner";
import { SearchResults } from "./SearchResults";
import { GifInfoModal } from "./GifInfoModal";

interface SearchProps {
  searchQuery: string | undefined;
  onSearchQueryChange: (query: string) => void;
  searchResults: IGif[] | Error | undefined;
}

/**
 * Main search dummy component.
 * Renders the search input and the search results.
 * @example
 * <Search
 *   searchQuery="sample_text"
 *   onSearchQueryChange={(newQuery) => setSearchQuery(newQuery)}
 *   searchResults={searchResults}
 *   isTrending={false} />
 * @param searchQuery The search query string
 * @param onSearchQueryChange The search query change handler
 * @param searchResults An array of search results
 * @param isTrending Boolean to show an additional header
 * @returns React component
 */
const Search: FC<SearchProps> = ({
  searchQuery,
  onSearchQueryChange,
  searchResults,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedGif, setSelectedGif] = useState<IGif>();
  const [isGifInfoModalOpen, setIsGifInfoModalOpen] = useState(false);

  const closeModal = () => {
    setIsGifInfoModalOpen(false);
  };

  const showGifInfo = (item: IGif) => {
    setSelectedGif(item);
    setIsGifInfoModalOpen(true);
  };

  useEffect(() => {
    searchInputRef.current?.focus();

    document.addEventListener("keydown", closeModal, false);

    return () => {
      document.removeEventListener("keydown", closeModal, false);
    };
  }, []);

  return (
    <>
      <div className="card shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label" htmlFor="searchQuery">
              <span className="label-text">Search all the GIFs</span>
            </label>
            <input
              type="search"
              value={searchQuery || ""}
              id="searchQuery"
              data-testid="searchQuery"
              className="input input-bordered input-primary focus:outline-0"
              onChange={(event) => onSearchQueryChange(event.target.value)}
              ref={searchInputRef}
              placeholder="Search"
            />
          </div>
          {searchResults === undefined ? (
            <Spinner title="Loading GIFs" className="block text-center my-10" />
          ) : (
            <SearchResults
              searchResults={searchResults}
              isTrending={searchQuery?.length === 0}
              onItemClick={showGifInfo}
            />
          )}
        </div>
      </div>
      {selectedGif && isGifInfoModalOpen && (
        <GifInfoModal gif={selectedGif} onClose={closeModal} />
      )}
    </>
  );
};

export { Search };
export type { SearchProps };
