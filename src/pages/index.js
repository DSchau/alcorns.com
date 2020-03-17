/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import SEO from '../components/seo'
import Page from '../components/page/'
import Section from '../components/section'
import PagePreview from '../components/page/preview'

function Photos({ data }) {
  const { contentfulPage, pages } = data
  return (
    <React.Fragment>
      <SEO title="Photos" description="An archive of photos for the Alcorns" />
      <Page {...contentfulPage}>
        {({ partial, body, section, gallery }) => (
          <SkipNavContent>
            {partial}
            {body}
            {section}
            {gallery}
            <Section
              title="All of our trips"
              sx={{ maxWidth: ['100%', `95ch`] }}
            >
              <div
                sx={{
                  display: `grid`,
                  gridTemplateColumns: [`1fr`, `repeat(2, 1fr)`],
                  gridGap: [0, 4],
                }}
              >
                {pages.nodes.map(node => (
                  <PagePreview key={node.id} {...node} />
                ))}
              </div>
            </Section>
          </SkipNavContent>
        )}
      </Page>
    </React.Fragment>
  )
}

export const photosQuery = graphql`
  {
    contentfulPage(slug: { eq: "/" }) {
      ...ContentfulPageDetails
    }
    pages: allContentfulPage(
      filter: { slug: { ne: "/" } }
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        id
        ...ContentfulPagePreviewDetails
      }
    }
  }
`

export default Photos
