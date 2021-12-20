import styled from "styled-components";

const GitInfoTile = ({ labelText, countPubRepos }) => {
  return (
    <div>
      <label>{labelText}</label>
      <label>{countPubRepos}</label>
    </div>
  );
};

export default GitInfoTile;
