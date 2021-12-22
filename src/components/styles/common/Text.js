import styled from "styled-components";

const Para = ({ children }) => {
  return <P>{children}</P>;
};

const SpanText = ({ children, color, weight }) => {
  return (
    <Span color={color} weight={weight}>
      {children}
    </Span>
  );
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

  @media (min-width: 700px) {
    font-size: 15px;
  }
`;

const Span = styled.span`
  font-size: 16px;
  color: ${(p) => p.color};
  font-weight: ${(p) => p.weight};

  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

export { Para, SpanText, Anchored };
