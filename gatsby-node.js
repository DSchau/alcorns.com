const slugify = require('limax')
const format = require('date-fns/format')

exports.onCreateNode = function onCreateNode({ actions, node }) {
  /*
   * We ignore the index because we create it in src/pages/index.js
   */
  if (node.internal.type === `ContentfulPage` && node.slug !== `/`) {
    const date = format(new Date(node.date), 'yyyy-MM-dd')
    actions.createNodeField({
      node,
      name: `slug`,
      value: `/${date}/${node.slug}/`,
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
      pages: allContentfulPage(filter: { fields: { slug: { ne: null } } }) {
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
