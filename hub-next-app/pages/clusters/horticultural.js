import Head from 'next/head';

import HubNavBar from '../../components/HubNavBar';
import ImageHeader from '../../components/ImageHeader';

// Import react-bootstrap components
import {
  Container,
  Row,
  Col,
  Button
 } from 'react-bootstrap';

const HorticulturalCluster = () => {
  return (
    <>
      <Head>
        <title>Horticultural Cluster - Smart Focus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HubNavBar/>
      <ImageHeader size="sm" url="/images/banners/banner-home.jpg">
        <div className='d-flex justify-content-center align-items-center w-100' style={{height: '85%'}}>
          <h1 className='text-white text-center intro-heading d-block'>Horticultural Cluster</h1>
        </div>
      </ImageHeader>
      <Container fluid>

      </Container>
    </>
  );
}
 
export default HorticulturalCluster;