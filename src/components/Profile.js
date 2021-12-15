import React from "react";
import { client } from "./api-client";

function Profile({ userName }) {
  const [state, setState] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const [profileData, setProfileData] = React.useState(null);

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

  return <div>{profileData ? <label>{profileData.id}</label> : "Profile"}</div>;
}

export default Profile;
