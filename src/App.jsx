import "./App.css";
import FlowPage from "./components/pages/FlowPage";
import { FlowContextProvider } from "./contexts/flowContext";
import "bootstrap-icons/font/bootstrap-icons.css";

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
