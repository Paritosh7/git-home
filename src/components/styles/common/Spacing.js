import styled from "styled-components";

/**
 * I am using it from Josh Comeau's Spacer component.
 */

function getHeight({ axis, size }) {
  return axis === "horizontal" ? 1 : size;
}
function getWidth({ axis, size }) {
  return axis === "vertical" ? 1 : size;
}
const Spacer = styled.span`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

const InlineSpacer = styled(Spacer)`
  display: inline-block;
`;
export { Spacer, InlineSpacer };
