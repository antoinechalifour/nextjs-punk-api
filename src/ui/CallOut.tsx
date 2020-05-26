import React from "react";
import styled from "styled-components";

const CallOutLayout = styled.div`
  border-radius: 0.4rem;
  padding: 2rem;

  background: linear-gradient(to left, #fdc830, #f37335);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (min-width: 800px) {
    margin-left: -2rem;
    margin-right: -2rem;
  }
`;

export const CallOut: React.FC = ({ children }) => (
  <CallOutLayout>
    <div>{children}</div>
  </CallOutLayout>
);
