import React from "react";
import Profile from "./Profile";
import Search from "./Search";

/**
 * Main only has the userName
 * The username is being fetched from Search
 * & passed to Profile.
 */

function Main() {
  const [userName, setuserName] = React.useState(null);

  function fetchUserName(userName) {
    setuserName(userName);
  }

  return (
    <div>
      <Search provideUser={fetchUserName} />
      <Profile userName={userName} />
    </div>
  );
}

export default Main;
