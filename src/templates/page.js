import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'

export default ({ data }) => <Page {...data.page} />

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      slug
      description
      title
      hero {
        id
        title
        description
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 85) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      contentBlocks {
        # gallery of images -- neat!
        ... on ContentfulGallery {
          __typename
          id
          ...GalleryDetails
        }
        # hero image, of course!


        # section of content
        ... on ContentfulSection {
          id
          __typename
          ...SectionDetails
        }
      }
    }
  }
`
