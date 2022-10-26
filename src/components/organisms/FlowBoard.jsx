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
    setReactFlowInstance,
    reactFlowWrapper,
    reactFlowInstance,
    getId,
    setNodes,
  } = useFlow();

  const onPaneClicked = () => setSelectedNode(null);

  const onNodeClicked = (e, node) => setSelectedNode(node);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
      ></ReactFlow>
    </>
  );
};

export default FlowBoard;
