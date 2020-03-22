import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { SkipNavLink } from '@reach/skip-nav'
import { graphql, useStaticQuery } from 'gatsby'

import { AuthProvider, AuthenticatedRoute } from '../components/authentication'
import Navigation from '../components/navigation'
import SEO from '../components/seo'
// import Banner from '../components/banner'

import '@reach/skip-nav/styles.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      contentfulAsset(title: { eq: "Alcorns Family on Cruise Ship" }) {
        localFile {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }

      contentfulPage(slug: { eq: "/" }) {
        title
        description
      }
    }
  `)
  return (
    <AuthProvider>
      <SEO
        {...data.contentfulPage}
        image={data.contentfulAsset.localFile.childImageSharp.resize}
      />

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

export default Layout
