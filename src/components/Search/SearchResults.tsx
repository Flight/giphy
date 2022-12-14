import type { FC } from "react";
import type { IGif } from "@giphy/js-types";

interface SearchResultsProps {
  searchResults: IGif[] | Error;
  isTrending?: boolean;
  onItemClick: (item: IGif) => void;
}

/**
 * Renders the search search results.
 * @example
 * <SearchResults
 *   searchResults={searchResults}
 *   isTrending={true}
 *   onItemClick={showItemInfo} />
 * @param searchResults An array of search results
 * @param isTrending Boolean to show an additional header
 * @param onItemClick The search item click handler
 * @returns React component
 */
const SearchResults: FC<SearchResultsProps> = ({
  searchResults,
  isTrending = false,
  onItemClick,
}) => (
  <div data-testid="search-results">
    {searchResults instanceof Error ? (
      <p className="text-neutral text-center mt-4">
        Something went wrong, please try again later.
      </p>
    ) : (
      <>
        {isTrending && (
          <h2 className="text-xl font-bold pb-5 text-center text-neutral mt-2 -mb-5">
            Trending
          </h2>
        )}
        {searchResults && searchResults.length === 0 ? (
          <p className="text-neutral text-center mt-4">Nothing found</p>
        ) : (
          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2 items-center">
            {searchResults &&
              searchResults.length > 0 &&
              searchResults.map((item) => (
                <li key={item.id} className="text-center">
                  <button type="button" onClick={() => onItemClick(item)}>
                    <img
                      src={item.images.fixed_height.webp}
                      width={item.images.fixed_height.width}
                      height={item.images.fixed_height.height}
                      alt={item.title}
                      className="inline rounded"
                      loading="lazy"
                    />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </>
    )}
  </div>
);

export { SearchResults };
export type { SearchResultsProps };
