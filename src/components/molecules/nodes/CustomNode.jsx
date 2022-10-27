//initial idea/prototype about a highly extensible node, where the node data ends
//up owning most of its look rather than the component. useful in some cases such
//as quick/flexible customization/configuration but drawback of deduplicating some
//of the component level stuff such as header title/styling as well as adding
//overhead to data such as visible properties

//nvm works better with settings panel

import React, { memo } from "react";
import { Handle } from "reactflow";
import "./CustomNode.scss";

const CustomNode = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
        style={{ background: "gray" }}
      />
      <div className="custom-node">
        <div className="custom-node-head">
          {data.bIcon && (
            <i className={`bi ${data.bIcon} custom-node-head-icon`}></i>
          )}
          <p className="custom-node-head-title">{data.name}</p>
        </div>
        <div className="custom-node-body">
          {data.data &&
            data.data.map((property, index) => {
              switch (property.type) {
                case "text":
                  return (
                    <p
                      key={`text${index}`}
                      style={property.style}
                      className="custom-node-body-text"
                    >
                      {property.value}
                    </p>
                  );
                case "image":
                  return (
                    <img
                      key={`image${index}`}
                      style={property.style}
                      src={property.value}
                      className="custom-node-body-image"
                    />
                  );
              }
            })}
        </div>
      </div>

      <Handle type="source" position="right" style={{ background: "gray" }} />
    </>
  );
};

export default CustomNode;
