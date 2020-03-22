import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { SkipNavLink } from '@reach/skip-nav'

import {
  AuthProvider,
  AuthenticatedRoute,
  useAuth,
} from '../components/authentication'
import Navigation from '../components/navigation'
// import Banner from '../components/banner'

import '@reach/skip-nav/styles.css'

export default ({ children }) => {
  return (
    <AuthProvider>
      <Styled.root>
        <Global
          styles={{
            'body, html, #___gatsby, #___gatsby > div': {
              height: '100%',
              overflow: `auto`,
            },
          }}
        />
        <AuthenticatedRoute>
          <React.Fragment>
            {/* <Banner id="announcement" /> */}
            <SkipNavLink />
            <Navigation showNavItems={false} />
            <main>{children}</main>
          </React.Fragment>
        </AuthenticatedRoute>
      </Styled.root>
    </AuthProvider>
  )
}
