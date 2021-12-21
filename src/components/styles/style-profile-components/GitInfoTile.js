import styled from "styled-components";
import { HeadingFour } from "../common/Headings";

const GitInfoTile = ({ labelText, count }) => {
  return (
    <Wrapper>
      <HeadingFour>{labelText}</HeadingFour>
      <span>{count}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  min-width: 79px;

  & > span {
    color: var(--color-light-black-full);
    font-weight: 700;
  }
`;

export default GitInfoTile;
