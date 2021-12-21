import styled from "styled-components";
import { InlineSpacer } from "../common/Spacing";
import { Para } from "../common/Text";

const ContactInfoTile = ({ Component: Icon, infoText }) => {
  return (
    <Wrapper text={infoText}>
      <Icon size={20} />
      <InlineSpacer size={16} />
      <Para>{infoText}</Para>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  // Not sure how to use variables inside styled components
  color: ${(p) => p.text === "Not Available" && "hsl(217,35%, 45%, 50%)"};
  padding: 8px 0 8px 0;
`;

export default ContactInfoTile;
