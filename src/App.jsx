import ErrorContextFunctions from "./ErrorContextFunctions";
import Page from "./Page";

function App() {
  return (
    <ErrorContextFunctions>
      <Page></Page>
    </ErrorContextFunctions>
  );
}

export default App;
