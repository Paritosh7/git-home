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
import useUserSearch from "./useUserSearch";
import { debounce } from "lodash";

function Search() {
  const [searchInput, setSearchInput] = React.useState("");
  const users = useUserSearch(searchInput);
  console.log(users);

  function handleChange(e) {
    setSearchInput(e.target.value);
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
    return () => {
      debouncedChangeHandler.cancel();
    };
  });

  return (
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
            <span style={{ display: "block", margin: 8 }}>No users found</span>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

export default Search;
