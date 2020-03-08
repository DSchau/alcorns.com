const slugify = require('limax')
const path = require('path')
const fs = require('fs-extra')

exports.onCreateNode = function onCreateNode({ actions, node }) {
  if (node.internal.type === `ContentfulPage`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: node.slug === `/` ? node.slug : `/${node.slug}/`,
    })
  } else if (
    node.title &&
    (node.internal.type === `ContentfulSection` ||
      node.internal.type === `ContentfulGallery`)
  ) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: slugify(node.title),
    })
  }
}

exports.createPages = async function createPages({ actions, graphql }) {
  const {
    data: { pages },
  } = await graphql(`
    {
      pages: allContentfulPage {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  pages.nodes.forEach(page => {
    const {
      fields: { slug },
    } = page

    actions.createPage({
      component: require.resolve(`./src/templates/page.js`),
      path: slug,
      context: {
        slug,
      },
    })
  })
}
