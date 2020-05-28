import React from "react";
import { render } from "@testing-library/react";

import { BeerList } from "@/ui/BeerList";
import { Beer } from "@/models/Beer";

describe("<BeerList />", () => {
  it("should render the beers", function () {
    // Given
    const beers: Beer[] = [
      {
        attenuation_level: 0,
        image_url: null,
        abv: 1,
        brewers_tips: "brewers tips",
        contributed_by: "john doe",
        description: "beer description",
        ebc: 1,
        first_brewed: "08/2020",
        food_pairing: ["chicken"],
        ibu: 1,
        id: 1,
        ingredients: {
          hops: [
            {
              amount: {
                unit: "gram",
                value: 1,
              },
              attribute: "flavor",
              name: "hop-1",
            },
          ],
          malt: [
            {
              amount: {
                value: 2,
                unit: "kg",
              },
              name: "malt-1",
            },
          ],
          yeast: "yeast-1",
        },
        name: "beer name",
        ph: 1,
        srm: 2,
        tagline: "tagline",
        target_fg: 1,
        target_og: 2,
      },
    ];

    // When
    const { getByText } = render(<BeerList beers={beers} />);

    // Then
    expect(getByText("beer name")).toBeDefined();
  });
});
