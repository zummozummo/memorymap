import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Workspace(props) {
  const [workspace, setWorkspace] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let data = { sidebar: [], editor: [], profile: [] };
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
        setWorkspace(data);
      }
    }
    fetchSidebar();
  }, []);
  useEffect(() => {
    console.log(workspace);
  }, [workspace]);
  return workspace ? <div>slug</div> : <div>loading</div>;
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
  if (!user) {
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
