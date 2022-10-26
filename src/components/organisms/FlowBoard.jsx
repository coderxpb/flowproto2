import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  updateEdge,
  addEdge,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Node A" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: { label: "Node B" },
    position: { x: 100, y: 200 },
  },
  {
    id: "3",
    data: { label: "Node C" },
    position: { x: 400, y: 200 },
  },
  {
    id: "4",
    data: { label: "Node C" },
    position: { x: 600, y: 200 },
  },
  {
    id: "5",
    data: { label: "Node C" },
    position: { x: 700, y: 200 },
  },
  {
    id: "6",
    data: { label: "Node E" },
    position: { x: 800, y: 200 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "updatable edge" },
  { id: "e1-3", source: "2", target: "3", label: "updatable edge" },
];

const FlowBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [sourceEdges, setSourceEdges] = useState({ 1: "2", 2: "3" });
  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );
  // const onConnect = useCallback(
  //   (params) => setEdges((els) => addEdge(params, els)),
  //   []
  // );
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onConnect={(e) => {
        console.log("on connect", e);
        if (sourceEdges[e.source]) {
          if (sourceEdges[e.source] != e.target) {
            console.log(edges);
            let node1 = edges.find((ed) => ed.source == e.source);
            sourceEdges[e.source] = e.target;
            onEdgeUpdate(node1, e);
          }
        } else {
          sourceEdges[e.source] = e.target;
          onConnect(e);
        }
      }}
      fitView
      attributionPosition="top-right"
    >
      <Controls />
    </ReactFlow>
  );
};

export default FlowBoard;
