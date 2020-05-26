import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Beer } from "@/models/Beer";

interface BeerListProps {
  beers: Beer[];
}

const List = styled.ul`
  li {
    padding: 1rem;
    line-height: 1.5;
  }

  li + li {
    border-top: 1px solid #ddd;
  }

  li a {
    height: 75px;
    display: grid;
    grid-template-columns: 75px 1fr;
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
  }
`;

export const BeerList: React.FC<BeerListProps> = ({ beers }) => (
  <List>
    {beers.map((beer) => (
      <li key={beer.id}>
        <article>
          <Link href="/beer/[beerId]" as={`/beer/${beer.id}`}>
            <a>
              <img src={beer.image_url} alt={beer.name} />
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
