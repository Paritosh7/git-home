import React from "react";
import { MdLightMode } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import styled from "styled-components/macro";

/**
 * themeState : true for LIGHT and false for dark
 */

function ToggleTheme() {
  const [themeState, setThemeState] = React.useState(() => true);

  const themeText = themeState ? "LIGHT" : "DARK";

  function changeTheme() {
    setThemeState((prevThemeState) => !prevThemeState);
  }
  return (
    <ButtonWrapper onClick={changeTheme}>
      {themeText} {themeText === "LIGHT" ? <MdLightMode /> : <RiMoonFill />}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: var(--color-light-background);
  border: none;
`;

export default ToggleTheme;
