import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { Beer } from "@/models/Beer";
import { PageContent } from "@/ui/PageContent";
import { VStack } from "@/ui/VStack";
import { BeerList } from "@/components/BeerList/BeerList";
import { PaginationLayout, PaginationLink } from "@/components/HomePage/styles";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

interface HomePageProps {
  beers: Beer[];
  previousPage: number | null;
  nextPage: number;
}

const HomePage: React.FC<HomePageProps> = ({
  beers,
  previousPage,
  nextPage,
}) => {
  const router = useRouter();
  const scrollRestoration = useScrollRestoration(router.asPath);

  return (
    <>
      <Head>
        <title>Browse all beers | Punk API Explorer</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        {...scrollRestoration}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PageContent>
          <VStack>
            <BeerList beers={beers} />

            <PaginationLayout>
              {previousPage && (
                <Link
                  href={{ pathname: "/", query: { page: previousPage } }}
                  passHref
                >
                  <PaginationLink>Previous</PaginationLink>
                </Link>
              )}
              <Link
                href={{ pathname: "/", query: { page: nextPage } }}
                passHref
              >
                <PaginationLink>Next</PaginationLink>
              </Link>
            </PaginationLayout>
          </VStack>
        </PageContent>
      </motion.div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
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

export default HomePage;
