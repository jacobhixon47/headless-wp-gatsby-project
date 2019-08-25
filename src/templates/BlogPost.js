import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Layout from '../components/layout';

const BlogPostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPost.title}
      description={data.wordpressPost.excerpt}
    />
    <h2>Hello>
    <h1>{data.wordpressPost.title}</h1>
    <Img
      sizes={data.wordpressPost.acf.image.localFile.childImageSharp.sizes}
      alt={data.wordpressPost.title}
      style={{maxHeight: 450}}
    />
    <div
      style={{marginTop: 20}}
      dangerouslySetInnerHTML={{ __html: data.wordpressPost.content}}
    />
    <p>Photo by <a href={data.wordpressPost.acf.author_link} target='__blank'>{data.wordpressPost.acf.author_name}</a> on Unsplash</p>
  </Layout>
);

export default BlogPostTemplate;

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
      acf {
        image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        author_link
        author_name
      }
    }
  }
`;
