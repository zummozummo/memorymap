import Head from 'next/head';
import { Provider } from "react-redux";
import cookie from "js-cookie";
import '../styles/globals.css';
import Layout from '../components/Layouts/Layout';
import { wrapper } from "../store/index"

function MyApp({ Component, pageProps, store }) {
    var getting = cookie.get('token') || true
    console.log(getting);    
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {getting && <Component {...pageProps} />}
    </Layout>
  );
}
export default wrapper.withRedux(MyApp);
