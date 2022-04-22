import Head from "next/head";
import { Fragment } from "react";
import axios from "axios";
import Layout from '../components/Layouts/Layout';

function HomePage({ user }) {
  console.log(user);
  return (
    <Fragment>
      <Head>
        <title>Memory Map</title>
        <meta name="description" content="Map your memory" />
      </Head>
      <>body</>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fmemorymap.dev%2Fapi%2Fusers%2Fgoogle%2Fcallback&client_id=573267777115-176069s8o4ghodq0qmo541otoqv1nv83.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
        LOGIN WITH GOOGLE
      </a>
    </Fragment>
  );
}
// export async function getServerSideProps({ req }) {
//   let user = "";
//   if (typeof window === "undefined") {
//     const { data } = await axios.get(
//       "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//       {
//         headers: req.headers,
//       }
//     );
//     user = data;
//   }
//   console.log(user);
//   return {
//     props: {
//       user,
//     },
//   };
// }

export default HomePage;
