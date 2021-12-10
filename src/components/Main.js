import React from "react";
import Profile from "./Profile";
import Search from "./Search";

function Main() {
  const [user, setUser] = React.useState(null);

  function fetchUser(user) {
    setUser(user);
  }

  return (
    <div>
      <Search provideUser={fetchUser} />
      <Profile userName={user} />
    </div>
  );
}

export default Main;
