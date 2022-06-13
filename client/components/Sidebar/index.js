import Explorer from "../Explorer";
import Profile from "../Profile";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <Profile />
      <Explorer structure={structure} />
    </div>
  );
}

const structure = [
  {
    type: "folder",
    name: "client",
    files: [
      {
        type: "folder",
        name: "Components",
        files: [
          { type: "file", name: "Button.jsx" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "index.html" },
      { type: "file", name: "style.css" },
    ],
  },
  {
    type: "folder",
    name: "Components",
    files: [
      { type: "file", name: "Button.jsx" },
      { type: "file", name: "Button.style.js" },
    ],
  },
];
