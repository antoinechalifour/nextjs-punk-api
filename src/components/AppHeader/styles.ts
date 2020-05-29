import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
  padding: 2rem;
  line-height: 1;
  border-bottom: 2px solid #ddd;

  font-weight: bold;

  button {
    background: none;
    border: none;
    font-family: inherit;
    color: inherit;
    padding: 0;
  }

  svg {
    display: block;
    width: 1.5rem;
  }

  h1 {
    flex: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  > * + * {
    margin-left: 2rem;
  }
`;
