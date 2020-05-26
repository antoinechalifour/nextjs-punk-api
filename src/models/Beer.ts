interface Amount {
  value: number;
  unit: string;
}

interface Hop {
  name: string;
  attribute: string;
  amount: Amount;
}

interface Malt {
  name: string;
  amount: Amount;
}

interface Ingredients {
  yeast: string;
  malt: Malt[];
  hops: Hop[];
}

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  first_brewed: string;
  image_url: string | null;
  food_pairing: string[];
  ingredients: Ingredients;
  contributed_by: string;
  brewers_tips: string;
  abv: number;
  attenuation_level: number;
  ebc: number;
  ibu: number;
  ph: number;
  srm: number;
  target_og: number;
  target_fg: number;
}
