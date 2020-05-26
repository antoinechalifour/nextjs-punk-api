import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Beer } from "@/models/Beer";
import axios from "axios";

const fetcher = (_: unknown, query: string) =>
  axios
    .get<Beer[]>(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
    .then((response) => response.data);

export const useSearch = (initialSearch: string) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialSearch);
  const { data } = useSWR(
    query.length > 2 ? ["/search", query] : null,
    fetcher
  );

  useEffect(() => {
    if (query === initialSearch) return;

    router.replace("/search", {
      pathname: "/search",
      query: { query },
    });
  }, [query, initialSearch]);

  const beers: Beer[] | undefined = data;

  return { beers, query, setQuery };
};
