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
      {nodeTemplate.data.bIcon && (
        <i className={`bi ${nodeTemplate.data.bIcon} node-card-icon`}></i>
      )}
      <p className="node-card-name">{nodeTemplate.data.name}</p>
    </div>
  );
};

export default NodeCard;
