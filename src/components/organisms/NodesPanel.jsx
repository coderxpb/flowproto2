import NodeCard from "../atoms/NodeCard";
import { useFlow } from "../../contexts/flowContext";
import "./NodesPanel.scss";
const NodesPanel = () => {
  const { nodesList } = useFlow();

  return (
    <aside className="nodes-panel">
      {nodesList.map((node) => (
        <NodeCard nodeTemplate={node} key={node.type} />
      ))}
    </aside>
  );
};

export default NodesPanel;
