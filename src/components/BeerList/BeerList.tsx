import React from "react";
import Link from "next/link";

import { Beer } from "@/models/Beer";

import { List } from "./styles";

interface BeerListProps {
  beers: Beer[];
}

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
