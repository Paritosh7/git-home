import React from "react";
import styled from "styled-components";
import { client } from "./api-client";
import { Spinner } from "./lib";
import { MdLocationOn } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import GitInfoTile from "./styles/style-profile-components/GitInfoTile";
import ContactInfoTile from "./styles/style-profile-components/ContactInfoTile";
import AvatarCardBasic from "./styles/style-profile-components/AvatarCard";
import GitInfoCard from "./styles/style-profile-components/GitInfoCard";

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
    <ProfileWrapper>
      {!userName && <p>Hey! Please search for a username above.</p>}

      {isLoading && <Spinner />}

      {isSuccess ? (
        <article>
          <AvatarCardBasic
            avatar={profileData.avatar_url}
            name={profileData.name}
            login={profileData.login}
            date={new Date(profileData.created_at).toLocaleDateString()}
          />
          <p>
            {profileData.bio ? `${profileData.bio}` : `This profile has no bio`}
          </p>

          <GitInfoCard
            countRepos={profileData.public_repos}
            followers={profileData.followers}
            following={profileData.following}
          />
          <section>
            <ContactInfoTile
              Component={MdLocationOn}
              infoText={profileData.location}
            />
            <ContactInfoTile Component={HiLink} infoText={profileData.blog} />
            <ContactInfoTile
              Component={FaTwitter}
              infoText={profileData.twitter_username}
            />
            <ContactInfoTile
              Component={MdWork}
              infoText={profileData.company}
            />
          </section>
        </article>
      ) : null}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.main`
  color: var(--color-light-text);
  background-color: var(--color-light-main);
  margin: 8px 16px 0 16px;
  padding: 16px;
  border-radius: 16px;
`;

export default Profile;
