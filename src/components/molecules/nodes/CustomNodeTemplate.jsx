//justa wrapper for other custom nodes

import Reac from "react";
import { Handle } from "reactflow";
import "./CustomNodeTemplate.scss";

const CustomNodeTemplate = ({ head, children }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
        style={{ background: "gray" }}
      />
      <div className="custom-node">
        <div className="custom-node-head" style={{ backgroundColor: head.color }}>
          {head.bIcon && (
            <i className={`bi ${head.bIcon} custom-node-head-icon`}></i>
          )}
          <p className="custom-node-head-title">{head.title}</p>
        </div>
        <div className="custom-node-body">{children}</div>
      </div>

      <Handle type="source" position="right" style={{ background: "gray" }} />
    </>
  );
};

export default CustomNodeTemplate;
