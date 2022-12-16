import { renderHook, waitFor } from "@testing-library/react";
import { useGiphy } from "./useGiphy";
import { sampleSearchResults } from "../dummyData/sampleSearchResults";

const mockFetch = vi.fn(() => ({
  ok: true,
  json: () => ({
    meta: {
      status: 200,
      msg: "OK",
    },
    data: sampleSearchResults,
  }),
}));
beforeEach(() => {
  Object.defineProperty(window, "fetch", {
    value: mockFetch,
  });
});

test("Gets the trending and search results with encoded params", async () => {
  const { result } = renderHook(() => useGiphy());
  const [fetchTrending, fetchSearchResults] = result.current;

  const trending = await fetchTrending();

  await waitFor(() => {
    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(
      expect.stringMatching(
        /.*\/\/api\.giphy\.com\/v1\/gifs\/trending.*api_key.*/
      )
    );

    expect(trending).toStrictEqual(sampleSearchResults);
  });

  const searchResults = await fetchSearchResults("test@!");

  await waitFor(() => {
    expect(mockFetch).toBeCalledTimes(2);
    expect(mockFetch).toBeCalledWith(
      expect.stringMatching(
        /.*\/\/api\.giphy\.com\/v1\/gifs\/search\?q=test%40!.*api_key.*/
      )
    );

    expect(searchResults).toStrictEqual(sampleSearchResults);
  });
});
