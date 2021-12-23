import styled from "styled-components";

const Anchored = styled.a`
  &::before {
    content: "@";
  }
`;

const Para = styled.p`
  font-size: 13px;

  @media (min-width: 700px) {
    font-size: 15px;
  }
`;

const SpanText = styled.span`
  font-size: 16px;
  color: ${(p) => p.color};
  font-weight: ${(p) => p.weight};

  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

export { Para, SpanText, Anchored };
