import Head from 'next/head';

import HubNavBar from '../../components/HubNavBar';
import Article from '../../components/Article';
import RelatedArticles from '../../components/RelatedArticles';
import Footer from '../../components/Footer';

import { fetchAPI, getStrapiURL, getTop4Articles } from "../../lib/api";
import { getRelatedArticles } from '../../lib/helpers';
import { Container } from 'react-bootstrap';
const qs = require('qs');

const EventPage = ({ global, article, related_articles }) => {
  return (
    <>
      <Head>
        <title>{article.attributes.title} - Smart Focus</title>
        <meta name="description" content={article.attributes.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HubNavBar logo={getStrapiURL(global.attributes.site_logo.data.attributes.url)} />
      <Article article={article} />
      <Container className='pb-5'>
        <RelatedArticles articles={related_articles} />
      </Container>
      <Footer logoSrc={getStrapiURL(global.attributes.site_logo.data.attributes.url)} email={global.attributes.contact_email} phone={global.attributes.phone} address={global.attributes.address} />
    </>
  );
}
 
export default EventPage;

export async function getStaticPaths() {
  const events = await fetchAPI('/events');

  const paths = events.map(article => {
    return {
      params: {
        slug: article.attributes.slug
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const query_global = qs.stringify({
    populate: '*'
  }, {
    encodeValuesOnly: true,
  });
  const global = await fetchAPI(`/global?${query_global}`);
  
  const query = qs.stringify({
    populate: {
      header_image: {
        populate: '*'
      },
      thumbnail_image: {
        populate: '*'
      },
      content: {
        populate: '*'
      },
    },
    filters: {
      slug: {
        $eq: params.slug
      },
    },
  }, {
    encodeValuesOnly: true,
  });
  const request = `/events?${query}`;
  const events = await fetchAPI(request);

  const related_articles = getTop4Articles(await getRelatedArticles(events[0]));

  return {
    props: {
      global, 
      article: events[0],
      related_articles
    }
  }
}