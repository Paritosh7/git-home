import styled from "styled-components";

const GitInfoTile = ({ labelText, count }) => {
  return (
    <Wrapper>
      <label>{labelText}</label>
      <label>{count}</label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
`;

export default GitInfoTile;
