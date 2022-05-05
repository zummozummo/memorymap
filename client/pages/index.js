import Head from "next/head";
import { Fragment } from "react";
import axios from "axios";
import Layout from "../components/Layouts/Layout";
import { connect } from "react-redux";
import SlugRedirect from "../components/common/Smart/SlugRedirect";
function HomePage({ user }) {
  console.log(user);
  return (
    // <Fragment>
    //   <Head>
    //     <title>Memory Map</title>
    //     <meta name="description" content="Map your memory" />
    //   </Head>
    //   <Layout />
    // </Fragment>
    user?.currentUser ? (
      <div>
        <SlugRedirect user={user.currentUser} />
        <Layout />
      </div>
    ) : (
      <div>not logged in</div>
    )
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
  return {
    props: {
      user,
    },
  };
}
function mapStateToProps(state) {
  console.log(state);
  return {
    test: "test",
  };
}
export default connect(mapStateToProps)(HomePage);
