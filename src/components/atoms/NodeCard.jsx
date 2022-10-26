import "./NodeCard.scss";

const NodeCard = ({ iconPath, color, name, type }) => {
  console.log(type);
  const onDragStart = (event, nodeType) => {
    console.log(type);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="node-card"
      onDragStart={(e) => onDragStart(e, type)}
      style={{ border: `1px solid ${color}`, color: `${color}` }}
      draggable
    >
      <img className="node-card-icon" src={iconPath} />
      <p className="node-card-name">{name}</p>
    </div>
  );
};

export default NodeCard;
