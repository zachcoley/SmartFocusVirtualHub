import Head from 'next/head';

import HubNavBar from '../../components/HubNavBar';
import ImageHeader from '../../components/ImageHeader';
import PersonOrBusinessCardGrid from '../../components/PersonOrBusinessCardGrid';
import Footer from '../../components/Footer';
import { fetchAPI, getStrapiURL } from '../../lib/api';
const qs = require('qs');

// Import react-bootstrap components
import {
  Container,
  Row,
  Col,
  Button
 } from 'react-bootstrap';

const EnvironmentalCluster = ({ global, partners }) => {
  return (
    <>
      <Head>
        <title>Environmental Cluster - Smart Focus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HubNavBar logo={getStrapiURL(global.attributes.site_logo.data.attributes.url)}/>
      <ImageHeader size="sm" src="/images/banners/banner-environmental-cluster.jpg">
        <div className='d-flex justify-content-center align-items-center w-100' style={{height: '85%'}}>
          <h1 className='text-white text-center intro-heading d-block'>Environmental Cluster</h1>
        </div>
      </ImageHeader>
      <Container>
        <section className='mt-5'>
          <p className='main-lead'>
            Soil has the capacity, if properly managed, to address some of humanity’s most urgent challenges such as water and food insecurity, poverty, and climate change through the capture of soil carbon.
          </p>
          <p className='main-lead'>
            Currently, grasslands and the wider environment are losing biodiversity at alarming rates.
          </p>
          <p className='main-lead'>
            Holistic Management of vegetation, grasslands, orchards, and other plants including the sea can result in the regeneration of soils and carbon sequestration, increased productivity and biological diversity, as well as economic and social well-being.
          </p>
          <p className='main-lead'>
            At Smart Focus, it’s our mission to regenerate these critically important and fragile grasslands, orchards and aquatic resources.
          </p>
          <p className='main-lead'>
            Holistic Management uses <strong>decision-making</strong> and <strong>planning procedures</strong> that give people the insights and management tools needed to work with the web of complexity that exists in nature: resulting in better, more informed decisions that balance key social, environmental, and financial considerations.
          </p>
          <p className='main-lead'>
            In the context of the ecological restoration of grasslands, orchards and water ways in our regions and openly sharing this knowledge.
          </p>
        </section>
        <section>
          <h2 className='text-center mt-5 mb-3 heading-lg'>People and businesses in this cluster</h2>
          <PersonOrBusinessCardGrid entries={partners}/>
        </section>
      </Container>
      <Footer logoSrc={getStrapiURL(global.attributes.site_logo.data.attributes.url)} email={global.attributes.contact_email} phone={global.attributes.phone} address={global.attributes.address}/>
    </>
  );
}
 
export default EnvironmentalCluster;

export async function getStaticProps() {
  const query_global = qs.stringify({
    populate: '*'
  }, {
    encodeValuesOnly: true,
  });
  const global = await fetchAPI(`/global?${query_global}`);

  const query_partners = qs.stringify({
    populate: {
      clusters: {
        fields: ['name']
      },
      image: {
        fields: ['url']
      }
    },
    filters: {
      clusters: {
        name: {
          $eq: 'Environment'
        }
      },
    },
  }, {
    encodeValuesOnly: true,
  });
  const request = `/partners?${query_partners}`;
  const partners = await fetchAPI(request);

  return {
    props: {
      global,
      partners
    }
  }
}