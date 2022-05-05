import axios from "axios";
const initialEditorFolder = { value: [""], type: "editor-folder" };
const initialEditorFile = { value: [""], type: "editor-file" };

export default async function createInitialWorkspace(authId) {
  const responseEditor = await axios({
    method: "post",
    url: "/api/block",
    data: initialEditorFolder, // you are sending body instead
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responsefile = await axios({
    method: "post",
    url: "/api/block",
    data: initialEditorFile,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const initialSidebar = {
    id: authId,
    type: "sidebar",
    value: [
      {
        id: responseEditor.data.id,
        name: "Workspace",
        type: "editor-folder",
        children: [
          {
            id: responsefile.data.id,
            name: "untitled",
            type: "editor-file",
            parent: responseEditor.data.id,
          },
        ],
        parent: authId,
      },
    ],
  };

  const responseSidbar = await axios({
    method: "post",
    url: "/api/block",
    data: initialSidebar, // you are sending body instead
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(responseSidbar.data.value[0].id);
  return responseSidbar.data.value[0].id;
}
