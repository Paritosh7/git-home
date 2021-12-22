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
import { Para } from "./styles/common/Text";
import { Spacer } from "./styles/common/Spacing";

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
          <Spacer size={32} />
          <LayoutShift>
            <Para>
              {profileData.bio
                ? `${profileData.bio}`
                : `This profile has no bio`}
            </Para>
            <Spacer size={24} />
            <GitInfoCard
              countRepos={profileData.public_repos}
              followers={profileData.followers}
              following={profileData.following}
            />
            <Spacer size={24} />
            <ContactInfoWrapper>
              <div>
                <ContactInfoTile
                  Component={MdLocationOn}
                  infoText={
                    profileData.location
                      ? profileData.location
                      : "Not Available"
                  }
                />
                <ContactInfoTile
                  Component={HiLink}
                  infoText={
                    profileData.blog ? profileData.blog : "Not Available"
                  }
                />
              </div>
              <div>
                <ContactInfoTile
                  Component={FaTwitter}
                  infoText={
                    profileData.twitter_username
                      ? profileData.twitter_username
                      : "Not Available"
                  }
                />
                <ContactInfoTile
                  Component={MdWork}
                  infoText={
                    profileData.company ? profileData.company : "Not Available"
                  }
                />
              </div>
            </ContactInfoWrapper>
          </LayoutShift>
        </article>
      ) : null}
    </ProfileWrapper>
  );
}

const LayoutShift = styled.div`
  @media (min-width: 1000px) {
    margin-top: -56px;
    margin-left: 136px;
  }
`;

const ContactInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;

  & > div {
    flex: 1;
  }

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const ProfileWrapper = styled.main`
  color: var(--color-light-text);
  background-color: var(--color-light-main);
  margin: 8px 16px 0 16px;
  padding: 24px;
  border-radius: 16px;
`;

export default Profile;
