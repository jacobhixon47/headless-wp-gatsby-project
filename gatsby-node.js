const path = require('path');
const { createFilePath } = ('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve('./src/templates/BlogPost.js');

  return graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {throw result.errors};

    const BlogPosts = result.data.allWordpressPost.edges;
    console.log(BlogPosts);
    BlogPosts.forEach( post => {
      createPage({
        path: `/post/${post.node.slug}`,
        component: BlogPostTemplate,
        context: {
          id: post.node.wordpress_id
        }
      });
    });

  });
}
