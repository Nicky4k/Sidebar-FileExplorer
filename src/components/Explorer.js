import { useState } from "react";

function Explorer({
  insertNodeHandler,
  docs,
  updateNodeHandler,
  deleteNodeHandler,
}) {
  const [folderOpen, setFolderOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [showEditTools, setShowEditTools] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showInputBox, setShowInputBox] = useState({
    visible: false,
    isFolder: null,
  });

  const toggleFolderIconHandler = (e) => {
    if (e.target.nodeName === "SECTION" || e.target.nodeName === "ARTICLE") {
      setExpand(!expand);
      setFolderOpen(!folderOpen);
    }
  };

  const newFileFolderHandler = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInputBox({ visible: true, isFolder });
  };

  const addFileFolder = (e) => {
    if (e.target.value.trim() && e.keyCode === 13) {
      setShowInputBox({ ...showInputBox, visible: false });
      insertNodeHandler(docs.id, e.target.value.trim(), showInputBox.isFolder);
    }
  };

  const renameFileFolder = (e) => {
    if (e.target.value.trim() && e.keyCode === 13) {
      setShowRename(false);
      updateNodeHandler(docs.id, e.target.value.trim());
    }
  };

  const deleteFileFolderHandler = (e) => {
    deleteNodeHandler(docs.id);
  };

  if (docs.isFolder) {
    return (
      <div style={{ marginLeft: "2rem" }}>
        <section
          className="folder"
          onClick={toggleFolderIconHandler}
          onMouseEnter={() => {
            setShowEditTools(!showEditTools);
          }}
          onMouseLeave={(e) => {
            setShowEditTools(!showEditTools);
          }}
        >
          <>
            <article className="not__selectable">
              <div>{folderOpen ? "📂" : "📁"}</div>
              {showRename && (
                <input
                  onKeyDown={(e) => renameFileFolder(e)}
                  autoFocus
                  className="input__newFileFolder"
                  type="text"
                  defaultValue={docs.name}
                  onBlur={() => {
                    setShowRename(false);
                  }}
                ></input>
              )}
              {!showRename && docs.name}
            </article>
            {showEditTools && (
              <figure style={{ marginRight: 0 }} className="not__selectable">
                <button
                  className="btn_styles"
                  onClick={(e) => setShowRename(true)}
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => newFileFolderHandler(e, false)}
                  className="btn_styles"
                >
                  📄
                </button>
                <button
                  onClick={(e) => newFileFolderHandler(e, true)}
                  className="btn_styles"
                >
                  🗂
                </button>
                <button
                  onClick={(e) => deleteFileFolderHandler(e)}
                  className="btn_styles"
                >
                  ❌
                </button>
              </figure>
            )}
          </>
        </section>
        {showInputBox.visible && (
          <div className="inputbox__styles">
            <span>{showInputBox.isFolder ? "📁" : "📄"}</span>
            <input
              onKeyDown={(e) => addFileFolder(e)}
              autoFocus
              className="input__newFileFolder"
              type="text"
              onBlur={() => {
                setShowInputBox({ ...showInputBox, visible: false });
              }}
            ></input>
          </div>
        )}
        <div style={{ display: expand ? "block" : "none" }}>
          {docs.items.map((doc) => (
            <Explorer
              updateNodeHandler={updateNodeHandler}
              insertNodeHandler={insertNodeHandler}
              deleteNodeHandler={deleteNodeHandler}
              docs={doc}
            />
          ))}
        </div>
      </div>
    );
  } else if (!docs.isFolder) {
    return (
      <div style={{ marginLeft: "2rem" }}>
        <section
          className="folder"
          onMouseEnter={(e) => {
            setShowEditTools(!showEditTools);
          }}
          onMouseLeave={(e) => {
            setShowEditTools(!showEditTools);
          }}
        >
          <article style={{ fontSize: "1rem" }} className="not__selectable">
            <div>📄 </div>
            {showRename && (
              <input
                onKeyDown={(e) => renameFileFolder(e)}
                autoFocus
                className="input__newFileFolder"
                type="text"
                defaultValue={docs.name}
                onBlur={() => {
                  setShowRename(false);
                }}
              ></input>
            )}
            {!showRename && docs.name}
          </article>
          {showEditTools && (
            <figure style={{ marginRight: 0 }} className="not__selectable">
              <button
                onClick={(e) => setShowRename(true)}
                className="btn_styles"
              >
                ✏️
              </button>
              <button
                onClick={(e) => deleteFileFolderHandler(e)}
                className="btn_styles"
              >
                ❌
              </button>
            </figure>
          )}
        </section>
      </div>
    );
  }
}

export default Explorer;
