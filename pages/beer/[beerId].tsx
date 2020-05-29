import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

import { Beer } from "@/models/Beer";
import { VStack } from "@/ui/VStack";
import { PageContent } from "@/ui/PageContent";
import { CallOut } from "@/ui/CallOut";
import { DiscList } from "@/ui/DiscList";
import {
  BeerImage,
  BeerTitle,
  DetailsList,
  Layout,
  SectionTitle,
  SubsectionTitle,
} from "@/components/BeerDetails/styles";

interface BeerDetailsPageProps {
  beer: Beer;
}

const IngredientList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;

  dt {
    display: inline-flex;
    align-items: center;
    font-weight: bold;
  }

  dt span {
    margin-left: 1ch;
    font-weight: normal;
    font-size: 1.2rem;
  }
`;

const BeerDetailsPage: React.FC<BeerDetailsPageProps> = ({ beer }) => (
  <>
    <Head>
      <title>{beer.name} | Punk API Explorer</title>

      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "translateY(0px)" }}
      exit={{ transform: "translateY(100%)" }}
    >
      <PageContent>
        <VStack>
          <BeerImage
            src={beer.image_url ?? "/default_beer_image.svg"}
            alt={beer.name}
          />

          <BeerTitle>{beer.name}</BeerTitle>

          <CallOut>
            <p>{beer.tagline}</p>
          </CallOut>

          <p>{beer.description}</p>

          <p>This beer was first brewed on {beer.first_brewed}</p>

          <SectionTitle>About this beer</SectionTitle>

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
              SRM <span>(Standard Reference Method)</span>
            </dt>
            <dd>{beer.srm}</dd>

            <dt>
              IBU <span>(International Bittering Units)</span>
            </dt>
            <dd>{beer.ibu}</dd>

            <dt>
              OG <span>(Original Gravity)</span>
            </dt>
            <dd>{beer.target_og}</dd>

            <dt>
              FG <span>(Final Gravity)</span>
            </dt>
            <dd>{beer.target_fg}</dd>

            <dt>PH</dt>
            <dd>{beer.ph}</dd>
          </DetailsList>

          <p>This beer is best served with the following ingredients :</p>

          <DiscList>
            {beer.food_pairing.map((food) => (
              <li key={food}>{food}</li>
            ))}
          </DiscList>

          <SectionTitle>Your brewer's tips</SectionTitle>
          <CallOut>
            <blockquote>{beer.brewers_tips}</blockquote>
          </CallOut>

          <SectionTitle>Ingredients</SectionTitle>
          <SubsectionTitle>Hops</SubsectionTitle>

          <IngredientList>
            {beer.ingredients.hops.map((hop) => (
              <>
                <dt>
                  {hop.name} <span>({hop.attribute})</span>
                </dt>
                <dd>
                  {hop.amount.value} {hop.amount.unit}
                </dd>
              </>
            ))}
          </IngredientList>

          <SubsectionTitle>Malts</SubsectionTitle>

          <IngredientList>
            {beer.ingredients.malt.map((malt) => (
              <>
                <dt>{malt.name}</dt>
                <dd>
                  {malt.amount.value} {malt.amount.unit}
                </dd>
              </>
            ))}
          </IngredientList>

          <SubsectionTitle>Yeast</SubsectionTitle>
          <p>{beer.ingredients.yeast}</p>

          <SectionTitle>Contributions</SectionTitle>
          <p>Contributed by {beer.contributed_by}.</p>
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
