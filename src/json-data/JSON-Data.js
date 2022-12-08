const explorer = {
  id: "1",
  name: "Files",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "index.html",
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: "4",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "5",
          name: "data",
          isFolder: true,
          items: [
            {
              id: "6",
              name: "json.js",
              isFolder: false,
              items: []
            }
          ]
        },
        {
          id: "7",
          name: "App.js",
          isFolder: false,
          items: []
        },
        {
          id: "8",
          name: "styles.css",
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: "9",
      name: "package.json",
      isFolder: false,
      items: []
    }
  ]
};

export default explorer;
