import React from "react";
import { MdLightMode } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import styled from "styled-components/macro";
import { InlineSpacer } from "./styles/common/Spacing";
import { SpanText } from "./styles/common/Text";

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
      <span>{themeText}</span>
      <InlineSpacer size={12} />
      {themeText === "LIGHT" ? (
        <MdLightMode size={20} />
      ) : (
        <RiMoonFill size={20} />
      )}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: var(--color-light-background);
  color: var(--color-light-text);
  font-weight: 700;
  border: none;

  & > span {
    font-size: 13px;
  }

  &:hover {
    color: var(--color-light-black-full);
  }
`;

export default ToggleTheme;
