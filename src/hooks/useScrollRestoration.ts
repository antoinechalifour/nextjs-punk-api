import { useEffect, useRef } from "react";

const SCROLL_CACHE = new Map<string, number>();

export const useScrollRestoration = (key: string) => {
  const scrollAreaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (!scrollArea) return;

    /*
    - Restore scroll based on the previous scroll.
    - Attach an event listener to update the previous scroll position
     */

    const handleScroll = () => SCROLL_CACHE.set(key, scrollArea.scrollTop);

    scrollArea.scrollTop = SCROLL_CACHE.get(key) || 0;
    scrollArea.addEventListener("scroll", handleScroll);

    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
    };
  }, [key]);

  return {
    ref: scrollAreaRef as any,
  };
};
