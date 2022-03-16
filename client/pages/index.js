import Head from 'next/head';
import { Fragment } from 'react';
import Editor from "../components/common/Smart/Editor/Editor"


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
        <Editor/>
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
  