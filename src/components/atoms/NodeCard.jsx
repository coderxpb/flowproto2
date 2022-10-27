import "./NodeCard.scss";

const NodeCard = ({ nodeTemplate }) => {
  const onDragStart = (event, nodeTemplate) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeTemplate)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="node-card"
      onDragStart={(e) => onDragStart(e, nodeTemplate)}
      style={{
        border: `1px solid ${nodeTemplate.color}`,
        color: `${nodeTemplate.color}`,
      }}
      draggable
    >
      <img className="node-card-icon" src={nodeTemplate.iconPath} />
      <p className="node-card-name">{nodeTemplate.data.name}</p>
    </div>
  );
};

export default NodeCard;
