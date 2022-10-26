import React, { memo } from "react";
import { Handle } from "reactflow";
import "./CustomNodeTemplate.scss";

const CustomNodeTemplate = ({ head, children }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="custom-node">
        <div className="custom-node-head" style={{ backgroundColor: head.color }}>
          <p className="custom-node-head-title">{head.title}</p>
        </div>
        <div className="custom-node-body">{children}</div>
      </div>

      <Handle type="source" position="right" />
    </>
  );
};

export default CustomNodeTemplate;
