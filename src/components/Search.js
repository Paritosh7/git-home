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
      <LogoSearch size={22} />

      <InputWrapper aria-label="Users">
        <Input
          onChange={debouncedChangeHandler}
          placeholder="Search Github username..."
        ></Input>
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
      </InputWrapper>
      <SearchButton>{isLoading ? <Spinner /> : "Search"}</SearchButton>
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-light-main);
  margin: 28px 16px 0 16px;
  border-radius: 16px;
  font-size: 13px;
`;

const LogoSearch = styled(IoSearchOutline)`
  color: var(--color-light-button);
  flex: 0 0 28px;
  margin-left: 8px;
`;

const InputWrapper = styled(Combobox)`
  border: none;
  flex: 1 0 0;
`;

const Input = styled(ComboboxInput)`
  width: 100%;
  padding: 18px 0 18px 4px;
  border: none;
`;
// Todo : need to think about min and max-width
const SearchButton = styled.button`
  padding: 12px 0 12px 0;
  border: none;
  background-color: var(--color-light-button);
  min-width: 84px;
  max-width: 106px;
  border-radius: 12px;
  font-weight: 700;
  color: white;
  margin-right: 6px;
`;

export default Search;
