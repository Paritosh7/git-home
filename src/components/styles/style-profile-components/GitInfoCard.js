import GitInfoTile from "./GitInfoTile";
import styled from "styled-components";

const GitInfoCard = ({ countRepos, followers, following }) => {
  return (
    <Wrapper>
      <GitInfoTile labelText="Repos" count={countRepos} />
      <GitInfoTile labelText="Followers" count={followers} />
      <GitInfoTile labelText="Following" count={following} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--color-light-background);
  border-radius: 8px;
`;

export default GitInfoCard;
