import React, { useEffect, useState } from "react";
import styled, {css, keyframes} from "styled-components";
import Router from "next/router";

interface LineProps {
  animate: boolean;
}

const loadingAnimation = keyframes`
from {
    left: -50%;
  }
  to {
    left: 100%;
  }

`;

const Line = styled.div<LineProps>`
  height: 6px;
  background: #f84f09;
  position: relative;
  overflow: hidden;

  ${(props: LineProps) =>
    props.animate &&
    css`
      &:after {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        animation: ${loadingAnimation} 1.5s forwards infinite;
        background: linear-gradient(
          to right,
          transparent 0%,
          rgba(255, 255, 255, 0.8) 33%,
          transparent 66%
        );
      }
    `}
`;

export const TopLine: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const startLoadingIndicator = () => setLoading(true);
    const stopLoadingIndicator = () => setLoading(false);

    Router.events.on("routeChangeStart", startLoadingIndicator);
    Router.events.on("routeChangeError", stopLoadingIndicator);
    Router.events.on("routeChangeComplete", stopLoadingIndicator);

    return () => {
      Router.events.off("routeChangeStart", startLoadingIndicator);
      Router.events.off("routeChangeError", stopLoadingIndicator);
      Router.events.off("routeChangeComplete", stopLoadingIndicator);
    };
  }, []);

  return <Line animate={isLoading} />;
};
