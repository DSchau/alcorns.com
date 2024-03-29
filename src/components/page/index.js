/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Image from 'gatsby-image'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Gallery from '../gallery'
import Section from '../section'
import SEO from '../seo'
import richTextRenderer from '../rich-text-renderer'
import Layout from '../../layouts/'

import partials from '../partials'
import { getDataFromContentBlocks } from './utils'

function Page({
  slug,
  children,
  description,
  title,
  featuredImage,
  contentBlocks,
  body,
}) {
  const page = getDataFromContentBlocks(contentBlocks)
  const Partial = partials(slug)
  return (
    <Layout
      seo={
        <SEO
          description={description}
          title={title}
          {...(featuredImage
            ? {
                image: featuredImage.localFile.childImageSharp.resize,
              }
            : {})}
        />
      }
    >
      <React.Fragment>
        {page.hero &&
          page.hero
            .filter(
              img =>
                img.hero &&
                img.hero.localFile &&
                img.hero.localFile.childImageSharp
            )
            .map(img => (
              <Image
                key={img.hero.id}
                alt={img.hero.title || img.hero.description}
                {...img.hero.localFile.childImageSharp}
              />
            ))}
        {typeof children === 'function' ? (
          children({
            partial: Partial && <Partial />,
            body: body && richTextRenderer(body.json),
            section:
              page.section &&
              page.section.map(section => (
                <Section key={section.id} {...section} />
              )),
            gallery:
              page.gallery &&
              page.gallery.map(gallery => (
                <Gallery key={gallery.id} {...gallery} />
              )),
          })
        ) : (
          <SkipNavContent>
            {Partial && <Partial />}
            {children}
            {body && richTextRenderer(body.json)}
            {page.gallery &&
              page.gallery.map(gallery => (
                <Gallery key={gallery.id} {...gallery} />
              ))}
            {page.section &&
              page.section.map(section => (
                <Section key={section.id} {...section} />
              ))}
            {}
          </SkipNavContent>
        )}
      </React.Fragment>
    </Layout>
  )
}

export const pageFragment = graphql`
  fragment ContentfulPageDetails on ContentfulPage {
    id
    slug
    description
    title
    body {
      json
    }
    contentBlocks {
      # gallery of images -- neat!
      ... on ContentfulGallery {
        __typename
        id
        ...GalleryDetails
      }
      # hero image, of course!
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

      # section of content
      ... on ContentfulSection {
        id
        __typename
        ...SectionDetails
      }
    }
  }
`

export default Page
