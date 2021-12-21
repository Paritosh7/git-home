import styled from "styled-components";

const Para = ({ children }) => {
  return <P>{children}</P>;
};

const SpanText = ({ children }) => {
  return <Span>{children}</Span>;
};

const Anchored = ({ children }) => {
  return <A>{children}</A>;
};

const A = styled.a`
  &::before {
    content: "@";
  }
`;

const P = styled.p`
  font-size: 13px;
`;

const Span = styled.span`
  font-size: 13px;
`;

export { Para, SpanText, Anchored };
