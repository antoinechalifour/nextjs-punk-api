import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = styled.header`
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

export const AppHeader: React.FC = () => {
  const router = useRouter();
  let leftIcon: JSX.Element | null = null;
  let rightIcon: JSX.Element | null = null;

  if (["/beer/[beerId]", "/search"].includes(router.pathname)) {
    leftIcon = (
      <button aria-label="Back to home page" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  }

  if (router.pathname === "/") {
    rightIcon = (
      <Link href="/search">
        <a>
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </Link>
    );
  }

  return (
    <Header>
      {leftIcon}

      <h1>Punk API Explorer</h1>

      {rightIcon}
    </Header>
  );
};
