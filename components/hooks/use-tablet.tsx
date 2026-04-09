import { useState, useEffect } from "react";

const QUERY = "(max-width: 1024px)";

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);

    const mediaHandler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mediaQuery.addEventListener("change", mediaHandler);

    return () => mediaQuery.removeEventListener("change", mediaHandler);
  }, []);

  return isTablet;
}
