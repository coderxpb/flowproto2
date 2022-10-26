//initial idea/prototype about a highly extensible node, where the node data ends
//up owning most of its look rather than the component. useful in some cases such
//as quick/flexible customization/configuration but drawback of deduplicating some
//of the component level stuff such as header title/styling as well as adding
//overhead to data such as visible properties

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
