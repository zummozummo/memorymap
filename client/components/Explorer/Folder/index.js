import React, { useState } from "react";

export default function Folder({ name, children }) {
  const [expand, setExpand] = useState(false);
  function updateExpand(e) {
    setExpand(!expand);
  }
  return (
    <React.Fragment>
      <div onClick={updateExpand}>{name}</div>
      <div style={{ display: expand ? "none" : "block", paddingLeft: "10px" }}>
        {children}
      </div>
    </React.Fragment>
  );
}
