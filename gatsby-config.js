require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')

module.exports = {
  siteMetadata: {
    title: `The Alcorns`,
    description: `The website for the Alcorns family, a family living in Minneapolis, Minnesota`,
    author: `schaudustin`,
    siteUrl: process.env.DEPLOY_URL || 'https://alcorns.com',
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        downloadLocal: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID,
      },
    },
  ],
}
