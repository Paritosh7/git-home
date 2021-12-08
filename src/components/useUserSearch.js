import React from "react";
import { client } from "./api-client";

/**
 * This is a renderless React Component. I want this component to hold
 * a status state (idle, loading, success, error). Since I am not sure
 * how to do that atm, I am not using it.
 */

function useUserSearch(searchTerm) {
  /**
   * giving users initial value as an array
   * is displaying no results found for a split second,
   * to avoid this I am using null as users initial value.
   * users will be an array
   */
  const [users, setUsers] = React.useState(() => null);

  React.useEffect(() => {
    if (searchTerm.trim() !== "") {
      let isFresh = true;
      client(`search/users?q=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${process.env.REACT_APP_GITHUB_KEY}
             `,
        },
      })
        .then(({ items: users }) => {
          if (isFresh) setUsers(users);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      return () => (isFresh = false);
    }
  }, [searchTerm]);

  return users;
}

export default useUserSearch;
