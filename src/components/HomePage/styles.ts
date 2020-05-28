import styled from "styled-components";

export const PaginationLayout = styled.nav`
  padding: 0 2rem;
  display: flex;

  a + a {
    margin-left: 1rem;
  }
`;

export const PaginationLink = styled.a`
  flex: 1;
  display: block;
  padding: 2rem;
  background: #ddd;
  width: 100%;
  text-align: center;
  color: inherit;
  text-decoration: none;
`;
