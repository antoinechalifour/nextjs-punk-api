import React from "react";
import styled from "styled-components";

const CallOutLayout = styled.div`
  background: #ddd;
  padding: 2rem;

  > div {
  }
`;

export const CallOut: React.FC = ({ children }) => (
  <CallOutLayout>
    <div>{children}</div>
  </CallOutLayout>
);
