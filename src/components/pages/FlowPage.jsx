import { useFlow } from "../../contexts/flowContext";
import { ReactFlowProvider } from "reactflow";
import FlowBoard from "../organisms/FlowBoard";
import NodesPanel from "../organisms/NodesPanel";
import SettingsPanel from "../organisms/SettingsPanel";
import FlashMessage from "../atoms/FlashMessage";
import "./FlowPage.scss";
import "reactflow/dist/style.css";

const FlowPage = () => {
  const { selectedNode, reactFlowWrapper, status, setStatus, saveHandler } =
    useFlow();

  return (
    <div className="flow-page">
      <div className="flow-page-nav">
        <button className="flow-page-nav-button" onClick={saveHandler}>
          Save Changes
        </button>
      </div>
      {status.showStatus && (
        <FlashMessage duration={4000}>
          <strong
            className={
              status.status ? "status status-success" : "status status-failure"
            }
          >
            {status.value}
          </strong>
        </FlashMessage>
      )}
      <div className="flow-page-body	">
        <ReactFlowProvider>
          <div
            className="flow-page-body-board reactflow-wrapper"
            ref={reactFlowWrapper}
          >
            <FlowBoard />
          </div>
        </ReactFlowProvider>

        <div className="flow-page-body-panels">
          {selectedNode ? <SettingsPanel /> : <NodesPanel />}
        </div>
      </div>
    </div>
  );
};

export default FlowPage;
