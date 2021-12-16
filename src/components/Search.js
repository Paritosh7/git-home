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
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";

/**
 * This component will search for username
 * and pass username to Main Component
 */

function Search({ provideUser }) {
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
    provideUser(userData.login);
  }

  // debouncing handleChange
  const debouncedChangeHandler = React.useMemo(
    () => debounce(handleChange, 300),
    []
  );

  React.useEffect(() => {
    if (!queried || query === "") return;

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
    <SearchWrapper>
      <IoSearchOutline />
      <Combobox aria-label="Users">
        <Input onChange={debouncedChangeHandler}></Input>
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
      <SearchButton>{isLoading ? <Spinner /> : "Search"}</SearchButton>
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-light-main);
  margin: 0 8px 0 8px;
  border-radius: 12px;
`;

const Input = styled(ComboboxInput)`
  padding: 16px 0 16px 0;
`;
// Todo : need to think about min and max-width
const SearchButton = styled.button`
  padding: 12px 0 12px 0;
  border: none;
  background-color: var(--color-light-button);
  min-width: 84px;
  max-width: 106px;
  border-radius: 12px;
  color: white;
`;

export default Search;
