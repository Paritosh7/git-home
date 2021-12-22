import styled from "styled-components";

const HeadingOne = ({ children }) => {
  return <One>{children}</One>;
};

const HeadingThree = ({ children }) => {
  return <Three>{children}</Three>;
};

const HeadingFour = ({ children }) => {
  return <Four>{children}</Four>;
};

const One = styled.h1`
  color: var(--color-light-black-full);
  font-size: 16px;

  @media (min-width: 700px) {
    font-size: 26px;
  }
`;

const Three = styled.h3`
  color: var(--color-light-button);
  font-weight: 400;
  font-size: 13px;

  @media (min-width: 700px) {
    font-size: 16px;
  }
`;

const Four = styled.h4`
  font-size: 11px;
  font-weight: 400;

  @media (min-width: 700px) {
    font-size: 13px;
  }
`;

export { HeadingOne, HeadingThree, HeadingFour };
