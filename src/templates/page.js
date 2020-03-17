import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'

export default ({ data }) => <Page {...data.page} />

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      ...ContentfulPageDetails
    }
  }
`
