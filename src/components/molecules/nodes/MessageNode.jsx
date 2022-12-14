import React, { memo } from "react";
import CustomNodeTemplate from "./CustomNodeTemplate";

export default memo(({ data }) => {
  return (
    <CustomNodeTemplate
      head={{ title: "Send Message", color: "#9BDED8", bIcon: "bi-chat-text" }}
    >
      <p>{data.data[0].value}</p>
    </CustomNodeTemplate>
  );
});
