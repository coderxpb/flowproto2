import NodeCard from "../atoms/NodeCard";
import { useFlow } from "../../contexts/flowContext";
import "./NodesPanel.scss";
const NodesPanel = () => {
  const { nodesList } = useFlow();

  return (
    <aside className="nodes-panel">
      {nodesList.map((node) => (
        <NodeCard
          name={node.name}
          type={node.type}
          key={node.type}
          color={node.color}
        />
      ))}
    </aside>
  );
};

export default NodesPanel;
