import styled, { css, keyframes } from "styled-components";

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

export const Line = styled.div<LineProps>`
  height: 6px;
  background: linear-gradient(to left, #fdc830, #f37335);
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
