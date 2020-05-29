import styled from "styled-components";

export const Form = styled.form`
  padding: 0 2rem;

  input {
    all: unset;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 2rem;
    background: #ddd;
  }
`;

export const ResultsTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-style: italic;
  color: #888;
`;
