import React from "react";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { VStack } from "@/ui/VStack";
import { PageContent } from "@/ui/PageContent";
import { ErrorMessage, Form, ResultsTitle } from "@/components/Search/styles";
import { BeerList } from "@/components/BeerList/BeerList";
import { useSearch } from "@/components/Search/hooks";

interface SearchPageProps {
  initialSearch: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialSearch }) => {
  const { beers, error, query, setQuery, inputRef } = useSearch(initialSearch);

  return (
    <>
      <Head>
        <title>Search beers | Punk API Explorer</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial={{ transform: "translateY(100%)" }}
        animate={{ transform: "translateY(0px)" }}
        exit={{ transform: "translateY(100%)" }}
      >
        <PageContent>
          <VStack>
            <Form onSubmit={(e) => e.preventDefault()}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search your favorite beer"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>

            {error && (
              <ErrorMessage>An error occurred, please try again</ErrorMessage>
            )}
            {beers && (
              <>
                <ResultsTitle>Results for "{query}"</ResultsTitle>
                <BeerList beers={beers} />
              </>
            )}
          </VStack>
        </PageContent>
      </motion.div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const initialSearch = (context.query.query as string) || "";

  return {
    props: { initialSearch },
  };
};

export default SearchPage;
