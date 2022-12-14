import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { IGif } from "@giphy/js-types";
import { useDebounce } from "../../hooks/useDebounce";
import { useGiphy } from "../../hooks/useGiphy";
import { Spinner } from "../Spinner/Spinner";

/**
 * Giphy search app.
 * Renders the search input, gets the response and
 * passing the results to the results component.
 * @returns React component
 */
const SearchApp: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [fetchTrending, fetchSearchResults] = useGiphy();
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<Error | IGif[]>();
  const [searchResults, setSearchResults] = useState<Error | IGif[]>();

  useEffect(() => {
    inputRef.current?.focus();

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
            onChange={(event) => setSearchQuery(event.target.value)}
            ref={inputRef}
            placeholder="Search"
          />
        </div>
        {isLoading ? (
          <Spinner title="Loading GIFs" className="block text-center my-10" />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {searchResults instanceof Error ? (
              <p className="text-neutral text-center">
                Something went wrong, please try again later.
              </p>
            ) : (
              <>
                {debouncedSearchQuery.length === 0 && (
                  <h2 className="text-xl font-bold pb-5 text-center text-neutral mt-2">
                    Trending
                  </h2>
                )}
                {searchResults?.length === 0 ? (
                  <p className="text-neutral text-center">Nothing found</p>
                ) : (
                  <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2 items-center">
                    {searchResults &&
                      searchResults.length > 0 &&
                      searchResults.map((item) => (
                        <li key={item.id} className="text-center">
                          <img
                            src={item.images.fixed_height.url}
                            width={item.images.fixed_height.width}
                            height={item.images.fixed_height.height}
                            alt={item.alt_text}
                            className="inline"
                          />
                        </li>
                      ))}
                  </ul>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { SearchApp };
