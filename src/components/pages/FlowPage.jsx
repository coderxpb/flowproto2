import { useFlow } from "../../contexts/flowContext";
import { ReactFlowProvider } from "reactflow";
import FlowBoard from "../organisms/FlowBoard";
import NodesPanel from "../organisms/NodesPanel";
import SettingsPanel from "../organisms/SettingsPanel";
import "./FlowPage.scss";
import "reactflow/dist/style.css";

const FlowPage = () => {
  const { selectedNode, reactFlowWrapper } = useFlow();

  return (
    <div className="flow-page">
      <ReactFlowProvider>
        <div className="flow-page-board reactflow-wrapper" ref={reactFlowWrapper}>
          <FlowBoard />
        </div>
      </ReactFlowProvider>

      <div className="flow-page-panels">
        {selectedNode ? <SettingsPanel /> : <NodesPanel />}
      </div>
    </div>
  );
};

export default FlowPage;
