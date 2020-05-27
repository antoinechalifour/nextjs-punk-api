import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Beer } from "@/models/Beer";

interface BeerListProps {
  beers: Beer[];
}

const List = styled.ul`
  li + li {
    border-top: 1px solid #ddd;
  }

  li a {
    line-height: 1.5;
    padding: 1rem;
    height: 96px;
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-gap: 2rem;
    text-decoration: none;
    color: inherit;
  }

  li a,
  li span {
    overflow: hidden;
  }

  li h2 {
    font-weight: bold;
    font-size: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li p {
    color: #373737;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li img {
    max-width: 100%;
    max-height: 75px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
  }
`;

export const BeerList: React.FC<BeerListProps> = ({ beers }) => (
  <List>
    {beers.map((beer) => (
      <li key={beer.id}>
        <article>
          <Link href="/beer/[beerId]" as={`/beer/${beer.id}`}>
            <a>
              <img
                src={beer.image_url ?? "/default_beer_image.svg"}
                alt={beer.name}
              />
              <span>
                <h2>{beer.name}</h2>
                <p>{beer.tagline}</p>
              </span>
            </a>
          </Link>
        </article>
      </li>
    ))}
  </List>
);
