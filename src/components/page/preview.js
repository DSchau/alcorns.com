/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Link from '../button-link'

import { getDataFromContentBlocks } from './utils'

function PagePreview({
  fields: { slug },
  description,
  date,
  title,
  body,
  contentBlocks,
}) {
  const page = getDataFromContentBlocks(contentBlocks)
  return (
    <article
      sx={{
        flex: 1,
        position: `relative`,
        backgroundColor: `background`,
        boxShadow: theme => `0 0 4px ${theme.colors.textShadow}`,
        mb: 2,
        mt: 2,
        padding: 2,
      }}
    >
      <Styled.h2 sx={{ textAlign: `center`, pt: 2, pb: 0, mb: 0 }}>
        {title}
      </Styled.h2>
      <Styled.h3 sx={{ textAlign: `center`, padding: 0, margin: 0, mb: 2 }}>
        {date}
      </Styled.h3>
      {page.hero && <Image {...page.hero[0].hero.localFile.childImageSharp} />}
      <Styled.p sx={{ pb: 60 }}>{description}</Styled.p>
      <Link
        to={slug}
        sx={{
          position: `absolute`,
          bottom: 2,
          left: `50%`,
          transform: `translateX(-50%)`,
        }}
      >
        View More
      </Link>
    </article>
  )
}

export const pagePreviewFragment = graphql`
  fragment ContentfulPagePreviewDetails on ContentfulPage {
    fields {
      slug
    }
    description
    title
    date(formatString: "MMM Do, YYYY")
    body {
      json
    }
    contentBlocks {
      ... on ContentfulHero {
        __typename
        hero: image {
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
      }
    }
  }
`

export default PagePreview
