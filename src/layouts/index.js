import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { SkipNavLink } from '@reach/skip-nav'

import Authentication from '../components/authentication'
import Navigation from '../components/navigation'
// import Banner from '../components/banner'

import '@reach/skip-nav/styles.css'

export default ({ children }) => (
  <React.Fragment>
    <Styled.root>
      <Global
        styles={{
          'body, html, #___gatsby, #___gatsby > div': {
            height: '100%',
          },
        }}
      />
      {/* <Banner id="announcement" /> */}
      <SkipNavLink />
      <Navigation showNavItems={false} />
      <main>{children}</main>
    </Styled.root>
  </React.Fragment>
)
