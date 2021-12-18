import React from "react";
import styled from "styled-components/macro";
import ToggleTheme from "./ToggleTheme";

function Header() {
  return (
    <HeaderWrapper>
      <h1>devfinder</h1>
      <ToggleTheme />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 28px 16px 0 16px;
`;

export default Header;
