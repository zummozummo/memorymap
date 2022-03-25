import Head from 'next/head';
import { Fragment } from 'react';

function HomePage(props) {
    return (
        <Fragment>
        <Head>
          <title>Memory Map</title>
          <meta
            name='description'
            content='Map your memory'
          />
        </Head>
      </Fragment>
        
    )
}


export function getStaticProps() {
  
    return {
      props: {
      },
    };
  }
  
  export default HomePage;
  