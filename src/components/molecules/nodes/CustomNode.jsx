import React, { memo } from "react";
import { Handle } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div>Header</div>

      {data.visibleProperties &&
        data.visibleProperties.map((property) => {
          switch (property.type) {
            case "text":
              return (
                <p key={property.key} style={property.style}>
                  {data[property.key]}
                </p>
              );
            case "image":
              return (
                <img
                  key={property.key}
                  style={property.style}
                  src={data[property.key]}
                />
              );
          }
        })}

      <Handle type="source" position="right" />
    </>
  );
};

export default CustomNode;
