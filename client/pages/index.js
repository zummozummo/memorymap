import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Styles from "../styles/Home.module.css";
import Main from "../components/Main";
import Footer from "../components/Footer";
import axios from "axios";
export default function Home({ user }) {
  console.log(user);
  return (
    <div className={Styles.home_container}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
export async function getServerSideProps({ req }) {
  let user = "";
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/currentuser",
      {
        headers: req.headers,
      }
    );
    user = data;
  }
  return {
    props: {
      user,
    },
  };
}

const structure = {
  type: "folder",
  name: "src",
  childrens: [
    {
      type: "folder",
      name: "Components",
      childrens: [
        { type: "file", name: "Modal.js" },
        { type: "file", name: "Modal.css" },
      ],
    },
    { type: "file", name: "package.json" },
  ],
};
