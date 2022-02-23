import Head from 'next/head';
import { Provider } from "react-redux";

import '../styles/globals.css';
import Layout from '../components/Layouts/Layout';
import { wrapper } from "../store/index"

function MyApp({ Component, pageProps, store }) {
  return (
    // <Provider store={wrapper}>
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </Layout>
    // </Provider>
  );
}
console.log(wrapper);
export default wrapper.withRedux(MyApp);
