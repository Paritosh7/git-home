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
          <ProfileHead>
            <ProfileImage
              alt={`${profileData.name} profile`}
              src={profileData.avatar_url}
            ></ProfileImage>
            <ProfileInitial>
              <h1>{profileData.name}</h1>
              <h3>{profileData.login}</h3>
              <p>{`Joined ${new Date(
                profileData.created_at
              ).toLocaleDateString()}`}</p>
            </ProfileInitial>
          </ProfileHead>
          <section>
            <p>
              {profileData.bio
                ? `${profileData.bio}`
                : `This profile has no bio`}
            </p>
            <div>
              <GitInfoTile
                labelText="Respos"
                countPubRepos={profileData.public_repos}
              />
              <GitInfoTile
                labelText="Followers"
                countPubRepos={profileData.public_repos}
              />
              <GitInfoTile
                labelText="Following"
                countPubRepos={profileData.following}
              />
            </div>
          </section>
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

const ProfileHead = styled.section`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  min-width: 70px;
  max-width: 117px;
  flex: 0.5 0.5 0;
  border-radius: 50%;
`;

const ProfileInitial = styled.div`
  margin-left: 20px;
`;

export default Profile;
