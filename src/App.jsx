import { useState } from "react";
import "./App.css";
import FlowBoard from "./components/organisms/FlowBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FlowBoard />
    </div>
  );
}

export default App;
