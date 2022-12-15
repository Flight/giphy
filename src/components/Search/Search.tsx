import type { FC, RefObject } from "react";
import type { IGif } from "@giphy/js-types";
import { Spinner } from "../Spinner/Spinner";
import { SearchResults } from "./SearchResults";
import { GifInfoModal } from "./GifInfoModal";

interface SearchProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isLoading: boolean;
  searchResults: IGif[] | Error | undefined;
  showGifInfo: (gif: IGif) => void;
  selectedGif: IGif | undefined;
  isTrending: boolean;
  searchInputRef: RefObject<HTMLInputElement>;
  isGifInfoModalOpen: boolean;
  closeModal: () => void;
}

const Search: FC<SearchProps> = ({
  searchQuery,
  onSearchQueryChange,
  isLoading,
  searchResults,
  showGifInfo,
  selectedGif,
  isTrending,
  searchInputRef,
  isGifInfoModalOpen,
  closeModal,
}) => (
  <>
    <div className="card shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label" htmlFor="searchQuery">
            <span className="label-text">Search all the GIFs</span>
          </label>
          <input
            type="search"
            value={searchQuery}
            id="searchQuery"
            data-testid="searchQuery"
            className="input input-bordered input-primary focus:outline-0"
            onChange={(event) => onSearchQueryChange(event.target.value)}
            ref={searchInputRef}
            placeholder="Search"
          />
        </div>
        {isLoading ? (
          <Spinner title="Loading GIFs" className="block text-center my-10" />
        ) : (
          <SearchResults
            searchResults={searchResults}
            isTrending={isTrending}
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

export { Search };
