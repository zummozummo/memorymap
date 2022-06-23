import { useRouter } from "next/router";
import axios from "axios";
import { Fragment } from "react";
import Head from "next/head";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import TextEditorNew from "../../components/common/Smart/EditorNew/Editornew";
import Sidebarnew from "../../components/common/Smart/Sidebarnew";
export default function Workspace(props) {
  const [workspace, setWorkspace] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let data = { sidebar: [], editor: [], profile: [], socket: null };
    data.profile = props.user.currentUser;
    async function fetchSidebar() {
      try {
        await axios
          .get(`/api/block/${props.user.currentUser.id}`)
          .then((res) => {
            data.sidebar = res.data;
          });
        await axios.get(`/api/block/${router.query.editorId}`).then((res) => {
          console.log(res.data);
          data.editor = res.data;
        });
      } catch (err) {
        console.log(err);
      } finally {
        const socket = io("/websockettest");
        data.socket = socket;
        setWorkspace(data);
      }
    }
    fetchSidebar();
    return () => {
      console.log("Socket disconnected");
      console.log(data.socket);
      data.socket.disconnect();
    };
  }, []);

  return workspace ? (
    <Fragment>
      <Head>
        <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
      </Head>
      <div style={{ paddingLeft: 500, width: 600 }}>
        <TextEditorNew
          currentblock={router.query.editorId}
          socket={workspace.socket}
          room={props.user.currentUser.id}
        />
      </div>
      <Sidebarnew data={workspace.sidebar} socket={workspace.socket} />
    </Fragment>
  ) : (
    <Fragment>
      <Head>
        <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
      </Head>
      <div>loading</div>
    </Fragment>
  );
}

export async function getServerSideProps({ req }) {
  let user = "";
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    user = data;
  }
  console.log(user);
  if (!user.currentUser) {
    return {
      redirect: {
        destination: "/auth/SignUp",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}
