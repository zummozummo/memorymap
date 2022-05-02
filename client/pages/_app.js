import Head from 'next/head';
import { Provider } from "react-redux";
import cookie from "js-cookie";
import '../styles/globals.css';
import Layout from '../components/Layouts/Layout';3
import { wrapper } from "../store/index"
import { useEffect, useState } from 'react';
import { userInfo } from '../store/actions/authActions';
import AuthRoute from '../components/common/Smart/AuthRoute';
import React from "react";
import axios from 'axios';
import { SIGNIN_AUTH } from '../store/actionTypes';

// function MyApp({ Component, pageProps, store }) {
// //     // console.log(token,"token");    
//     const [user,setUser] = useState(null)
//     // useEffect( async ()=>{
//     //   // props.dispatch(userInfo())
//     //   const res = await axios.get("/api/users/currentuser");
//     //     console.log(res.data);
//     // dispatch({ type: SIGNIN_AUTH, payload: res.data.currentUser });

//     //     // setUser(res.data.currentUser)
//     // },[]);
// }




// const AppComponent = ({ Component, pageProps }) => {
//   return (
//     <div>
//       {/* <h1>Header! {email}</h1> */}
//       <Component {...pageProps} />
//     </div>
//   );
// };

// AppComponent.getInitialProps = async (ctx) => {
//   let user = "";
//   console.log(ctx)
//   // if (typeof window === "undefined") {
//   //   const { data } = await axios.get(
//   //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//   //     {
//   //       // headers: req.headers,
//   //     }
//   //   );
//   //   user = data;
//   // }
//   // console.log(user);

//   return {
//     user
//   };
// };

// export default wrapper.withRedux(MyApp);

// export default AppComponent;


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default wrapper.withRedux(MyApp);

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

// export default MyApp
