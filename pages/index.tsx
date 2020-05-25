import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

import { Beer } from "../src/models/Beer";
import { motion } from "framer-motion";
import styled from "styled-components";
import { PageContent } from "../src/ui/PageContent";
import { VStack } from "../src/ui/VStack";
import {BeerList} from "@/ui/BeerList";

interface HomeProps {
  beers: Beer[];
  previousPage: number | null;
  nextPage: number;
}

const PaginationLayout = styled.nav`
  padding: 0 2rem;
  display: flex;

  a + a {
    margin-left: 1rem;
  }
`;

const PaginationLink = styled.a`
  flex: 1;
  display: block;
  padding: 2rem;
  background: #ddd;
  width: 100%;
  text-align: center;
  color: inherit;
  text-decoration: none;
`;

const Home: React.FC<HomeProps> = ({ beers, previousPage, nextPage }) => (
  <>
    <Head>
      <title>Browse all beers | Punk API Explorer</title>

      <link rel="icon" href="/favicon.ico" />
    </Head>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageContent>
        <VStack>
          <BeerList beers={beers}/>

          <PaginationLayout>
            {previousPage && (
              <Link
                href={{ pathname: "/", query: { page: previousPage } }}
                passHref
              >
                <PaginationLink>Previous</PaginationLink>
              </Link>
            )}
            <Link href={{ pathname: "/", query: { page: nextPage } }} passHref>
              <PaginationLink>Next</PaginationLink>
            </Link>
          </PaginationLayout>
        </VStack>
      </PageContent>
    </motion.div>
  </>
);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const currentPage = context.query.page ? Number(context.query.page) : 1;
  const response = await axios.get<Beer[]>(
    `https://api.punkapi.com/v2/beers?page=${currentPage}`
  );

  return {
    props: {
      beers: response.data,
      nextPage: currentPage + 1,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};

export default Home;
