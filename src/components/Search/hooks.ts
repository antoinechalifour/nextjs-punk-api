import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Beer } from "@/models/Beer";
import axios from "axios";

const fetcher = (_: unknown, query: string) =>
  axios
    .get<Beer[]>(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
    .then((response) => response.data);

export const useSearch = (initialSearch: string) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [query, setQuery] = useState(initialSearch);
  const { data } = useSWR(query ? ["/search", query] : null, fetcher);

  const beers: Beer[] | undefined = data;

  useEffect(() => {
    if (query === initialSearch) return;

    router.replace("/search", {
      pathname: "/search",
      query: { query },
    });
  }, [router, query, initialSearch]);

  useEffect(() => {
    const input = ref.current;

    if (!input) return;

    const handleTouchMove = () => input.blur();

    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return { beers, query, setQuery, inputRef: ref };
};
