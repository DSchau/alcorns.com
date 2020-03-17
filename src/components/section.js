/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import richTextRenderer from './rich-text-renderer'

function Section({ body, children, fields, title, ...rest }) {
  return (
    <Styled.div
      sx={{
        padding: 3,
        borderTop: `1px solid #eee`,
        borderBottom: `1px solid #eee`,
        margin: '0 auto',
        maxWidth: ['100%', '65ch'],
      }}
      {...rest}
    >
      <Styled.h2
        sx={{ textAlign: 'center', fontSize: 32 }}
        {...(fields ? { id: fields.slug } : {})}
      >
        {title}
      </Styled.h2>
      {body && richTextRenderer(body.json)}
      {children}
    </Styled.div>
  )
}

export const sectionQuery = graphql`
  fragment SectionDetails on ContentfulSection {
    body {
      json
    }
    fields {
      slug
    }
    title
  }
`

export default Section
