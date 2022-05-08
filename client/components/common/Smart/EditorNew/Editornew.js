import React, { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
export default function TextEditorNew(props) {
  console.log(props);
  const room = props.room;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      console.log("load document");
      console.log(document);
      //[{ insert: document[0] }, { insert: "\n" }]
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", room, props.currentblock);
  }, [socket, quill, room]);

  useEffect(() => {
    console.log(props.socket);
    setSocket(props.socket);
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      console.log(quill.getContents());
      socket.emit("save-document", quill.getContents());
    }, 5000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      console.log(delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-change", delta);
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    console.log(wrapper);
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow" });
    console.log(q);
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return <div id="container" ref={wrapperRef}></div>;
}
