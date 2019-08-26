import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
        host
        port
      }
      allWordpressPost {
        edges {
          node {
            path
            title
          }
        }
      }
    }
  `)
  var pages = data.allWordpressPost.edges;
  var navLinks = [];
  pages.forEach(sitePage => {
    navLinks.push(
      <p>
        <Link
          to={`/post/${sitePage.node.path}`}
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
        >
          {sitePage.node.title}
        </Link>
      </p>
    );
  })
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {navLinks}
      </div>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
