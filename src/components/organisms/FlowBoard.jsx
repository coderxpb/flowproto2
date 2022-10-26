import React, { useCallback, useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useFlow } from "../../contexts/flowContext";

const FlowBoard = () => {
  const {
    nodeTypes,
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
    onEdgeUpdate,
    onConnect,
    setSelectedNode,
  } = useFlow();

  const onPaneClicked = () => setSelectedNode(null);

  const onNodeClicked = (e, node) => setSelectedNode(node);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        onPaneClick={onPaneClicked}
        onNodeClick={onNodeClicked}
      ></ReactFlow>
    </>
  );
};

export default FlowBoard;
