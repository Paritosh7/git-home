import React from "react";

function useUserSearch(searchTerm) {
  /**
   * giving users initial value as an array
   * is displaying no results found for a split second,
   * to avoid this I am using null as users initial value.
   * users will be an array
   */
  const [users, setUsers] = React.useState(() => null);

  //   const cache = {};
  function fetchUsers(value) {
    // if (cache[value]) {
    //   return Promise.resolve(cache[value]);
    // }
    return fetch(`https://api.github.com/search/users?q=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GITHUB_KEY}
        `,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const { items } = result;
        // cache[value] = items;
        return items;
      });
  }

  React.useEffect(() => {
    if (searchTerm.trim() !== "") {
      let isFresh = true;
      fetchUsers(searchTerm).then((users) => {
        if (isFresh) setUsers(users);
      });
      return () => (isFresh = false);
    }
  }, [searchTerm]);

  return users;
}

export default useUserSearch;
