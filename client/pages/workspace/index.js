import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import Styles from "../../styles/Workspace.module.css";
import React from "react";
export default function WorkspaceRedirect() {
  return (
    <div className={Styles.workspace_container}>
      <Sidebar />
      <Editor />
    </div>
  );
}
//user exist   -->update store
//get sidebar & editor --> update store with sidebar and current selected and editor data
//workspace/[editorid]
