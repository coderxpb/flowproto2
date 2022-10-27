import React, {
  createContext,
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

//all the nodes that can be dragged and dropped on the nodes panel, supports custom
//nodes or extend CustomNode
const nodesList = [
  {
    type: "messageNode",
    color: "#1758DE",
    data: {
      name: "Message",
      message: "hello",
      data: [{ type: "text", value: "hello" }],
    },
  },
  {
    type: "customNode",
    color: "#93D945",
    data: {
      name: "Text",
      data: [{ type: "text", value: "hello2" }],
    },
  },
  {
    type: "customNode",
    color: "#12B8F2",
    data: {
      name: "Text and Image",
      data: [
        { type: "text", value: "hello3" },
        {
          type: "image",
          value: "https://avatars.githubusercontent.com/u/9304091?s=96&v=4",
        },
      ],
    },
  },
  {
    type: "customNode",
    color: "#4227F2",
    data: {
      name: "Image",
      data: [
        {
          type: "image",
          value: "https://avatars.githubusercontent.com/u/9304091?s=96&v=4",
        },
      ],
    },
  },
];

const initialNodes = [
  {
    id: "1",
    type: "messageNode",
    data: {
      name: "Message",
      data: [
        {
          type: "text",
          value:
            "nodjfk jsalf kjl dsafdsa fdsaf dsa fsdf dsaf dsaf dsaf dsa dsaf dsaf dsafsaf dsa fsa dsa fdsa f",
        },
      ],
    },
    position: { x: 800, y: 400 },
  },
];

const initialEdges = [];

const FlowContext = createContext({});

const FlowContextProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [status, setStatus] = useState({ showStatus: false });
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const saveHandler = () => {
    console.log(edges.length, nodes.length);
    if (edges.length < nodes.length - 1) {
      setStatus({ showStatus: true, status: false, value: "Cannot save Flow" });
      setTimeout(() => {
        setStatus({ showStatus: false });
      }, 5000);
    } else {
      setStatus({
        showStatus: true,
        status: true,
        value: "Flow saved",
      });
      setTimeout(() => {
        setStatus({ showStatus: false });
      }, 5000);
    }
  };
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
        status,
        setStatus,
        saveHandler,
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
