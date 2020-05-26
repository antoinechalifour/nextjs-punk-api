import React from "react";
import styled from "styled-components";

const CallOutLayout = styled.div`
  border-radius: 0.4rem;
  padding: 2rem;

  background: hsl(205, 74%, 27%);
  color: hsl(205, 74%, 97%);
  text-shadow: 0 1px 3px hsl(205, 74%, 5%);

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
