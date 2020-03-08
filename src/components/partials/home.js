/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <Styled.div sx={{ textAlign: `center`, pt: `10vh` }}>
        <Styled.h1
          sx={{
            fontSize: [30, 48],
            padding: [2, 4],
            mb: [2, 0],
            textTransform: `uppercase`,
          }}
        >
          The Alcorns
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [30, 48], fontFamily: `Parisienne` }}>
          Minneapolis, MN
        </Styled.h2>
      </Styled.div>
    </React.Fragment>
  )
}
