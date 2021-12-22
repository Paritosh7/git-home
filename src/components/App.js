import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <AppWrapper>
      <Header />
      <Main />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export default App;
