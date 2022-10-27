import React, { memo } from "react";
import CustomNodeTemplate from "./CustomNodeTemplate";

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeTemplate head={{ title: "Send Message", color: "#9BDED8" }}>
      <p>{data.data[0].value}</p>
    </CustomNodeTemplate>
  );
});
