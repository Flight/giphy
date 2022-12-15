// https://usehooks.com/useDebounce/
import { useEffect, useState } from "react";

/**
 * This hook returns the input value if it wasn't changed during the delay.
 * @example
 * const debouncedSearchValue = useDebounce(searchValue, 2000);
 * @param value Input value
 * @param delay Optional delay until the debounced value would be updated (default 1000ms)
 * @returns the last value which wasn't changed during the delay
 */
const useDebounce = <T>(value: T, delay: number = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
