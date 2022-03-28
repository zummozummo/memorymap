import Head from 'next/head';
import { Provider } from "react-redux";
import cookie from "js-cookie";
import '../styles/globals.css';
import Layout from '../components/Layouts/Layout';
import { wrapper } from "../store/index"
import { useEffect } from 'react';
import { userInfo } from '../store/actions/authActions';

function MyApp({ Component, pageProps, store }) {
    // console.log(token,"token");    
    useEffect(()=>{
      // props.dispatch(userInfo())
    },[]);

  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {typeof window !== 'undefined' && <Component {...pageProps} />}
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
