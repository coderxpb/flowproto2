import React, {
  createContext,
  ReactElement,
  useContext,
  useCallback,
  useState,
  useRef,
} from "react";
import { useNodesState, useEdgesState, updateEdge, addEdge } from "reactflow";
import CustomNode from "../components/molecules/nodes/CustomNode";
import MessageNode from "../components/molecules/nodes/MessageNode";

let id = 99;
const getId = () => `newnode_${id++}`;

const nodeTypes = {
  customNode: CustomNode,
  messageNode: MessageNode,
};

const nodesList = [
  {
    name: "Message",
    type: "messageNode",
    color: "#1758DE",
    data: {
      message: "hello",
    },
  },
  { name: "FFA", type: "customNode", color: "#93D945", data: {} },
];

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Node A" },
    position: { x: 250, y: 0 },
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
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "2", target: "3" },
];

const FlowContext = createContext({});

const FlowContextProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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
        nodesList,
        reactFlowWrapper,
        reactFlowInstance,
        setNodes,
        getId,
        addNewEdge,
        setReactFlowInstance,
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
