import React from "react";
import { MdLightMode } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";

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
    <div>
      <button onClick={changeTheme}>
        {themeText} {themeText === "LIGHT" ? <MdLightMode /> : <RiMoonFill />}
      </button>
    </div>
  );
}

export default ToggleTheme;
