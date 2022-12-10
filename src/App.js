import { useState } from "react";
import Explorer from "./components/Explorer";
import useTraverseTree from "./hooks/use-traverse-tree";
import explorer from "./json-data/JSON-Data";
import "./styles.css";

export default function App() {
  const [docs, setDocs] = useState(explorer);

  const { insertNode, updateNode,pushDeletedNodes, deleteNode } = useTraverseTree();

  const insertNodeHandler = (folderId, itemName, isFolder) => {
    const updatedTree = insertNode(explorer, folderId, itemName, isFolder);
    setDocs(updatedTree);
  };

  const updateNodeHandler = (folderId, itemName) => {
    const updatedTree = updateNode(explorer, folderId, itemName);
    setDocs(updatedTree);
  };

const pushDeletedNodesHandler = (nodeId) => {
  pushDeletedNodes(nodeId)
}

  const deleteNodeHandler = (folderId) => {
    const updatedTree = deleteNode(explorer, folderId);
    setDocs(updatedTree);
  };

  return (
    <div
      className="App not__selectable"
      style={{
        margin: "0 2vw",
        padding: "1rem",
        width: "92vw",
        height: "fit-content",
        border: "1px solid darkgrey",
        borderRadius: "0.25rem",
        color: "darkgray",
      }}
    >
      <h4 style={{ margin: "0.5rem 0 1rem 0" }}>Sidebar File Explorer</h4>
      <Explorer
        updateNodeHandler={updateNodeHandler}
        insertNodeHandler={insertNodeHandler}
        deleteNodeHandler={deleteNodeHandler}
        pushDeletedNodesHandler={pushDeletedNodesHandler}
        docs={docs}
      />
    </div>
  );
}
