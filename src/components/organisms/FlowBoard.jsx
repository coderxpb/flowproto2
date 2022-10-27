import React, { useCallback } from "react";
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

  //hide settings panel on flow board click
  const onPaneClicked = () => setSelectedNode(null);

  //show settings panel on node click
  const onNodeClicked = (e, node) => setSelectedNode(node);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeTemplate = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      // check if the dropped element is valid
      if (typeof nodeTemplate === "undefined" || !nodeTemplate) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      console.log(nodeTemplate.type);
      const newNode = {
        id: getId(),
        type: nodeTemplate.type,
        position,
        data: JSON.parse(JSON.stringify(nodeTemplate.data)),
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
