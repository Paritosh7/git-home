import React from "react";
import { client } from "./api-client";
import { Spinner } from "./lib";

function Profile({ userName }) {
  const [state, setState] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const [profileData, setProfileData] = React.useState(null);

  const isSuccess = state === "success";
  const isLoading = state === "loading";
  const isError = state === "error";

  React.useEffect(() => {
    if (!userName) return;
    setState("loading");
    client(`users/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GITHUB_KEY}`,
      },
    })
      .then((data) => {
        setProfileData(data);
        setState("success");
      })
      .catch((err) => {
        setError(err);
        setState("error");
      });
  }, [userName]);

  return (
    <div>
      {!userName && <p>Nothing to show</p>}

      {isLoading && <Spinner />}

      {isSuccess ? (
        <div>
          <label>{profileData.login}</label>
          <label>{profileData.name}</label>
          <label>{profileData.company}</label>
          <label>{profileData.followers}</label>
          <label>{profileData.following}</label>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
