import { useFlow } from "../../contexts/flowContext";
import FlowBoard from "../organisms/FlowBoard";
import NodesPanel from "../organisms/NodesPanel";
import SettingsPanel from "../organisms/SettingsPanel";
import "./FlowPage.scss";

const FlowPage = () => {
  const { selectedNode } = useFlow();
  return (
    <div className="flow-page">
      <div className="flow-page-board">
        <FlowBoard />
      </div>
      <div className="flow-page-panels">
        {selectedNode ? <NodesPanel /> : <SettingsPanel />}
      </div>
    </div>
  );
};

export default FlowPage;
