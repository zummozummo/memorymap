import React from "react";
import styles from "./Explorer.module.css";
import File from "./File";
import Folder from "./Folder";
export default function Explorer({ structure }) {
  console.log(structure);
  return (
    <div>
      {structure.map((item, index) => {
        if (item.type === "file") {
          return <File key={index} name={item.name} />;
        }
        if (item.type === "folder") {
          return (
            <Folder key={index} name={item.name}>
              <Explorer structure={item.files} />
            </Folder>
          );
        }
      })}
    </div>
  );
}
