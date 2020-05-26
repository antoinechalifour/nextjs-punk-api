import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { VStack } from "@/ui/VStack";
import { Beer } from "@/models/Beer";
import { PageContent } from "@/ui/PageContent";
import { CallOut } from "@/ui/CallOut";
import {
  BeerImage,
  BeerTitle,
  DetailsList,
  Layout,
  SectionTitle,
} from "@/components/BeerDetails/styles";

interface BeerDetailsPageProps {
  beer: Beer;
}

const BeerDetailsPage: React.FC<BeerDetailsPageProps> = ({ beer }) => (
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
          <BeerImage src={beer.image_url} alt={beer.name} />

          <BeerTitle>{beer.name}</BeerTitle>

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

export const getServerSideProps: GetServerSideProps<BeerDetailsPageProps> = async (
  context
) => {
  const response = await axios.get<Beer[]>(
    `https://api.punkapi.com/v2/beers/${context.params!.beerId}`
  );

  return { props: { beer: response.data[0] } };
};

export default BeerDetailsPage;
