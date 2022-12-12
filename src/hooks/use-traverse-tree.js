let deletedNodes = [];

const useTraverseTree = () => {
  function insertNode(tree, folderId, itemName, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, itemName, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  function updateNode(tree, folderId, itemName) {
    if (tree.id === folderId) {
      tree.name = itemName;
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return updateNode(ob, folderId, itemName);
    });

    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId) {
    if (tree.id === folderId) {
      delete tree.name;
      delete tree.items;
      delete tree.isFolder;
      tree.items = [];
      return tree;
    }

    let latestNode = [];
    let filteredNodes = tree.items.filter((ob) => ob.id !== folderId);
    latestNode = filteredNodes.map(ob => deleteNode(ob, folderId));


    return { ...tree, items: latestNode };
  }
  function pushDeletedNodes(nodeId) {
    deletedNodes.push(nodeId);
  }

  return { insertNode, updateNode, pushDeletedNodes, deleteNode };
};

export default useTraverseTree;
