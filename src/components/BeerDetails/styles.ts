import styled from "styled-components";
import { motion } from "framer-motion";

export const Layout = styled(motion.div)`
  padding: 2rem;
  background: #fff;
`;

export const BeerImage = styled.img`
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

export const BeerTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export const SubsectionTitle = styled.h4`
  font-style: italic;
`;

export const DetailsList = styled.dl`
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
