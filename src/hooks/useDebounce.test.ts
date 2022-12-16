import { renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

test("Debounces the value after the timeout", async () => {
  const { result, rerender } = renderHook((value) => useDebounce(value, 10), {
    initialProps: "initial value",
  });
  expect(result.current).toBe("initial value");

  rerender("new value");
  expect(result.current).toBe("initial value");

  rerender("final value");
  expect(result.current).toBe("initial value");
  setTimeout(() => {
    expect(result.current).toBe("final value");
  }, 100);
});
