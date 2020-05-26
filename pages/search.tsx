import React from "react";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { BeerList } from "@/ui/BeerList";
import { VStack } from "@/ui/VStack";
import { PageContent } from "@/ui/PageContent";
import { Form } from "@/components/Search/styles";
import { useSearch } from "@/components/Search/hooks";

interface SearchPageProps {
  initialSearch: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialSearch }) => {
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

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const initialSearch = (context.query.query as string) || "";

  return {
    props: { initialSearch },
  };
};

export default SearchPage;
