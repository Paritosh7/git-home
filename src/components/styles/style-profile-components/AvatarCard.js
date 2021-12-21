import styled from "styled-components";
import { HeadingOne, HeadingThree } from "../common/Headings";
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
        <Para>{`Joined ${date}`}</Para>
      </BasicInfoWrapper>
    </CardWrapper>
  );
};

const BasicInfoWrapper = styled.div`
  margin-left: 20px;
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
`;

export default AvatarCardBasic;
