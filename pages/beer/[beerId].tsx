import React from "react";
import axios from "axios";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";

import { VStack } from "@/ui/VStack";
import { Beer } from "@/models/Beer";
import { PageContent } from "@/ui/PageContent";
import Head from "next/head";
import { CallOut } from "@/ui/CallOut";

interface BeerDetailsProps {
  beer: Beer;
}

const Layout = styled(motion.div)`
  padding: 2rem;
  background: #fff;
`;

const Avatar = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 125px;
  height: 125px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 1rem;
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const DetailsList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;

  @media (min-width: 800px) {
    grid-template-columns: auto 1fr auto 1fr;
  }

  dt {
    text-align: right;
  }

  dt span {
    font-size: 1.2rem;
  }

  dd {
    font-weight: bold;
  }
`;

const BeerDetails: React.FC<BeerDetailsProps> = ({ beer }) => (
  <>
    <Head>
      <title>{beer.name} | Punk API Explorer</title>

      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout
      initial={{ transform: "translateX(100%)" }}
      animate={{ transform: "translateX(0px)" }}
      exit={{ transform: "translateX(100%)" }}
    >
      <PageContent>
        <VStack>
          <Avatar src={beer.image_url} alt={beer.name} />

          <PageTitle>{beer.name}</PageTitle>

          <DetailsList>
            <dt>
              ABV <span>(Alcohol by volume)</span>
            </dt>
            <dd>{beer.abv}</dd>

            <dt>
              EBC <span>(European Brewery Convention)</span>
            </dt>
            <dd>{beer.ebc}</dd>

            <dt>
              IBU <span>(International Bittering Units)</span>
            </dt>
            <dd>{beer.ibu}</dd>

            <dt>PH</dt>
            <dd>{beer.ph}</dd>
          </DetailsList>

          <SectionTitle>Your brewer's tips</SectionTitle>
          <CallOut>
            <blockquote>{beer.brewers_tips}</blockquote>
          </CallOut>

          <SectionTitle>About this beer</SectionTitle>
          <CallOut>
            <p>{beer.tagline}</p>
          </CallOut>
          <p>{beer.description}</p>
        </VStack>
      </PageContent>
    </Layout>
  </>
);

export const getServerSideProps: GetServerSideProps<BeerDetailsProps> = async (
  context
) => {
  const response = await axios.get<Beer[]>(
    `https://api.punkapi.com/v2/beers/${context.params!.beerId}`
  );

  return { props: { beer: response.data[0] } };
};

export default BeerDetails;
