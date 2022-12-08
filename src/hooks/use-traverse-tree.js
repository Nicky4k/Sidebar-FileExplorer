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

  return { insertNode, updateNode };
};

export default useTraverseTree;
