import React, {
  createContext,
  ReactElement,
  useContext,
  useCallback,
  useState,
} from "react";

import { useNodesState, useEdgesState, updateEdge, addEdge } from "reactflow";

import CustomNode from "../components/molecules/nodes/CustomNode";
import MessageNode from "../components/molecules/nodes/MessageNode";

const nodeTypes = {
  customNode: CustomNode,
  messageNode: MessageNode,
};

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
    id: "7",
    type: "customNode",
    data: {
      label: "Node E",
      imageURL: "https://avatars.githubusercontent.com/u/9304091?s=40&v=4",
      visibleProperties: [
        { key: "label", type: "text", style: { fontSize: "10px" } },
      ],
    },
    position: { x: 800, y: 200 },
  },
  {
    id: "8",
    type: "messageNode",
    data: {
      message:
        "nodjfk jsalf kjl dsafdsa fdsaf dsa fsdf dsaf dsaf dsaf dsa dsaf dsaf dsafsaf dsa fsa dsa fdsa f",
    },
    position: { x: 800, y: 400 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "updatable edge" },
  { id: "e1-3", source: "2", target: "3", label: "updatable edge" },
];

const FlowContext = createContext({});

const FlowContextProvider = ({ children }: { children: ReactElement }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onConnect = (newEdge) => {
    //find source node of connection
    let sourceNode = edges.find((edge) => edge.source == newEdge.source);
    if (sourceNode) {
      //if source node has an existing edge with another target then update the edge
      if (sourceNode.target != newEdge.target) onEdgeUpdate(sourceNode, newEdge);
    } else {
      //if source node doesn't have an edge, create a new edge
      addNewEdge(newEdge);
    }
  };

  const addNewEdge = (newEdge) =>
    setEdges((existingEdges) => addEdge(newEdge, existingEdges));

  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        nodeTypes,
        addNewEdge,
        onConnect,
        onEdgeUpdate,
        setSelectedNode,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

const useFlow = () => useContext(FlowContext);

export { FlowContextProvider, useFlow };
