import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Beer } from "@/models/Beer";
import { BeerList } from "@/ui/BeerList";
import { VStack } from "@/ui/VStack";
import { PageContent } from "@/ui/PageContent";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface SearchProps {
  initialSearch: string;
}

const Form = styled.form`
  padding: 0 2rem;

  input {
    all: unset;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 2rem;
    background: #ddd;
  }
`;

const fetcher = (_: unknown, query: string) =>
  axios
    .get<Beer[]>(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
    .then((response) => response.data);

const useSearch = (initialSearch: string) => {
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

const Index: React.FC<SearchProps> = ({ initialSearch }) => {
  const { beers, query, setQuery } = useSearch(initialSearch);

  return (
    <>
      <Head>
        <title>Search beers | Punk API Explorer</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PageContent>
          <VStack>
            <Form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search your favorite beer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>

            {beers && <BeerList beers={beers} />}
          </VStack>
        </PageContent>
      </motion.div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const initialSearch = (context.query.query as string) || "";

  return {
    props: { initialSearch },
  };
};

export default Index;
