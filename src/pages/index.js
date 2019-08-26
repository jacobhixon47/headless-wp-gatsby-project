import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul style={{ listStyle: 'none'}}>
      {data.allWordpressPost.edges.map(post => (
        <li
          style={{ padding: '20px 0', borderBottom: '1px solid #ccc' }}
          key={post.node.id}
        >
          <Link
            to={`/post/${post.node.slug}`}
            style={{ display: 'flex', color: 'black', textDecoration: 'none'}}
          >
            <Img
              sizes={post.node.featured_media.localFile.childImageSharp.sizes}
              alt={post.node.title}
              style={{ width: '25%', marginRight: 20 }}
            />
            <div style={{ width: '75%' }}>
              <h3
                dangerouslySetInnerHTML={{ __html: post.node.title}}
                style={{ marginBottom: 0}}
              />
              <p style={{ margin: 0, color: 'grey' }}>
                Photo by {post.node.acf.author_name}.
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.node.excerpt}} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          acf {
            author_name
          }
        }
      }
    }
  }
`
