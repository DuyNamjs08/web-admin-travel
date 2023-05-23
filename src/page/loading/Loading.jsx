import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

function Loading(props) {
  return (
    <Container>
      <div style={{marginLeft:'0'}}>
        <CircularProgress />
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 76px);
  width: calc(100vw - 160px);
  /* margin-left: 160px; */
  /* margin-top: 76px; */
  z-index: 1000;
`;

export default Loading;
