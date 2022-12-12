import { useState } from "react";
import Explorer from "./components/Explorer";
import useTraverseTree from "./hooks/use-traverse-tree";
import explorer from "./json-data/JSON-Data";
import "./styles.css";

export default function App() {
  const [docs, setDocs] = useState(explorer);

  const { insertNode, updateNode, deleteNode } = useTraverseTree();

  const insertNodeHandler = (folderId, itemName, isFolder) => {
    const updatedTree = insertNode(docs, folderId, itemName, isFolder);
    setDocs(updatedTree);
  };

  const updateNodeHandler = (folderId, itemName) => {
    const updatedTree = updateNode(docs, folderId, itemName);
    setDocs(updatedTree);
  };


  const deleteNodeHandler = (folderId) => {
    const updatedTree = deleteNode(docs, folderId);
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
        docs={docs}
      />
    </div>
  );
}
