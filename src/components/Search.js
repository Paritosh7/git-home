import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { debounce } from "lodash";
import { client } from "./api-client";
import { Spinner } from "./lib";

function Search() {
  console.log("Search called");

  const [status, setStatus] = React.useState("idle");
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  function handleChange(e) {
    console.log(e);
    setQueried(true);
    setQuery(e.target.value);
  }

  function handleClick(userData) {
    console.log(userData);
  }

  // debouncing handleChange
  const debouncedChangeHandler = React.useMemo(
    () => debounce(handleChange, 300),
    []
  );

  React.useEffect(() => {
    if (!queried) return;

    setStatus("loading");
    client(`search/users?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GITHUB_KEY}
           `,
      },
    })
      .then(({ items: users }) => {
        console.log(users);
        setUsers(users);
        setStatus("success");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });

    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [query, queried, debouncedChangeHandler]);

  return (
    <div style={{ display: "flex" }}>
      <Combobox aria-label="Users">
        <ComboboxInput onChange={debouncedChangeHandler}></ComboboxInput>
        {users && (
          <ComboboxPopover>
            {users.length > 0 ? (
              <ComboboxList>
                {users.slice(0, 10).map((result, index) => (
                  <ComboboxOption
                    key={index}
                    value={`${result.login}`}
                    onClick={() => handleClick(result)}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span>No users found</span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>

      {isLoading ? <Spinner /> : null}
    </div>
  );
}

export default Search;
