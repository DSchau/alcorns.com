/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import SEO from '../components/seo'
import Gallery from '../components/gallery'

function Photos({ data }) {
  const { archive } = data
  const gallery = archive.nodes.reduce((merged, node) => {
    return merged.concat(
      node.contentBlocks
        ? node.contentBlocks.filter(
            block => block.__typename === `ContentfulGallery`
          )
        : []
    )
  }, [])
  return (
    <React.Fragment>
      <SEO title="Photos" description="An archive of photos for the Alcorns" />
      <SkipNavContent>
        {gallery.map(node => (
          <Gallery key={node.contentBlocks} {...node} />
        ))}
      </SkipNavContent>
    </React.Fragment>
  )
}

export const photosQuery = graphql`
  {
    archive: allContentfulPage {
      nodes {
        contentBlocks {
          # gallery of images -- neat!
          ... on ContentfulGallery {
            __typename
            id
            ...GalleryDetails
          }
        }
      }
    }
  }
`

export default Photos
