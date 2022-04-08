import Head from "next/head";
import { Fragment } from "react";
import axios from "axios";
function HomePage({ user }) {
  console.log(user);
  return (
    <Fragment>
      <Head>
        <title>Memory Map</title>
        <meta name="description" content="Map your memory" />
      </Head>
      <>body</>
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
  return {
    props: {
      user,
    },
  };
}

export default HomePage;
