import "./App.css";
import FlowPage from "./components/pages/FlowPage";
import { FlowContextProvider } from "./contexts/flowContext";

function App() {
  return (
    <div className="App">
      <FlowContextProvider>
        <FlowPage />
      </FlowContextProvider>
    </div>
  );
}

export default App;
