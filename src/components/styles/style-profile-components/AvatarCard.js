import styled from "styled-components";
import { HeadingOne, HeadingThree } from "../common/Headings";
import { Spacer } from "../common/Spacing";
import { Para } from "../common/Text";

const AvatarCardBasic = ({ avatar, name, login, date }) => {
  return (
    <CardWrapper>
      <Avatar alt={`${name} profile`} src={avatar}></Avatar>
      <BasicInfoWrapper>
        <div>
          <HeadingOne>{name}</HeadingOne>
          <HeadingThree>{login}</HeadingThree>
        </div>
        <div>
          <Spacer size={8} />
          <Para>{`Joined ${date}`}</Para>
        </div>
      </BasicInfoWrapper>
    </CardWrapper>
  );
};

const BasicInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Avatar = styled.img`
  min-width: 70px;
  max-width: 117px;
  flex: 0.5 0.5 0;
  border-radius: 50%;
`;

const CardWrapper = styled.section`
  display: flex;
  align-items: center;

  @media (min-width: 700px) {
    align-items: flex-start;
  }
`;

export default AvatarCardBasic;
