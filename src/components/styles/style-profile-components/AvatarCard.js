import styled from "styled-components";

const AvatarCardBasic = ({ avatar, name, login, date }) => {
  return (
    <CardWrapper>
      <Avatar alt={`${name} profile`} src={avatar}></Avatar>
      <BasicInfoWrapper>
        <div>
          <h1>{name}</h1>
          <h3>{login}</h3>
        </div>
        <p>{`Joined ${date}`}</p>
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
