import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import axios from "axios";
import Layout from '../components/Layouts/Layout';
import SlugRedirect from '../components/common/Smart/SlugRedirect';
import { userProfile } from '../store/actions/userProfileActions';
import { useDispatch } from 'react-redux';


function HomePage({ user }) {

  const dispatch = useDispatch();
  console.log("user", user);

  useEffect(() => {
    console.log("user", dispatch);
    dispatch(userProfile(user))
  }, [user])
  return (
    // user?.currentUser ? 

    <React.Fragment>
      <SlugRedirect />
      <Layout />
    </React.Fragment>


    // <Fragment>
    //   <Head>
    //     <title>Memory Map</title>
    //     <meta name="description" content="Map your memory" />
    //   </Head>
    //   <Layout/>
    // </Fragment>
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
