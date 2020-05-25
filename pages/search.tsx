import React, {  useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Beer } from "@/models/Beer";
import { BeerList } from "@/ui/BeerList";
import { VStack } from "@/ui/VStack";
import {PageContent} from "@/ui/PageContent";

const Form = styled.form`
  padding: 2rem 2rem 0;

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

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data } = useSWR(
    query.length > 2 ? ["/search", query] : null,
    fetcher
  );

  const beers: Beer[] | undefined = data;

  return (
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
  );
};

export default Search;
