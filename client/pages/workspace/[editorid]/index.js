import Sidebar from "../../../components/Sidebar";
import Editor from "../../../components/Editor";
import Styles from "../../../styles/Workspace.module.css";
export default function Workspace() {
  return (
    <div className={Styles.workspace_container}>
      <Sidebar />
      <Editor />
    </div>
  );
}

//just display sidebar and editor with correct data.
