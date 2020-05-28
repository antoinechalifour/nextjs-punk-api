import styled from "styled-components";

export const AppLayout = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    position: relative;
  }

  main > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;
