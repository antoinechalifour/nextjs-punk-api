import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

import { Header } from "./styles";

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

      <h1>
        <Link href="/">
          <a>Punk API Explorer</a>
        </Link>
      </h1>

      {rightIcon}
    </Header>
  );
};
