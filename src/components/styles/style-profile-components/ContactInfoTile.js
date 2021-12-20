import styled from "styled-components";

const ContactInfoTile = ({ Component: Icon, infoText }) => {
  return (
    <Wrapper>
      <Icon />
      <span>{infoText}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default ContactInfoTile;
