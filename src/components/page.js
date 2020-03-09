/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Image from 'gatsby-image'
import { SkipNavContent } from '@reach/skip-nav'

import Gallery from '../components/gallery'
import Section from '../components/section'
import SEO from '../components/seo'
import richTextRenderer from '../components/rich-text-renderer'

import partials from '../components/partials'

function Page({
  slug,
  children,
  description,
  title,
  featuredImage,
  contentBlocks,
  body,
}) {
  const page = contentBlocks.reduce((merged, block) => {
    switch (block.__typename) {
      case 'ContentfulGallery':
        merged.gallery = (merged.gallery || []).concat(block)
        break
      case 'ContentfulSection':
        merged.section = (merged.section || []).concat(block)
        break
      case 'ContentfulHero':
        merged.hero = (merged.hero || []).concat(block)
        break
      default:
        break
    }
    return merged
  }, {})
  const Partial = partials(slug)
  return (
    <React.Fragment>
      <SEO
        description={description}
        title={title}
        {...(featuredImage
          ? {
              image: featuredImage.localFile.childImageSharp.resize,
            }
          : {})}
      />
      {page.hero &&
        page.hero
          .filter(img => !!img.hero)
          .map(img => (
            <Image
              key={img.hero.id}
              alt={img.hero.title || img.hero.description}
              {...img.hero.localFile.childImageSharp}
            />
          ))}
      <SkipNavContent>
        {Partial && <Partial />}
        {children}
        {body && richTextRenderer(body.json)}
        {page.section &&
          page.section.map(section => (
            <Section key={section.id} {...section} />
          ))}
        {page.gallery &&
          page.gallery.map(gallery => (
            <Gallery key={gallery.id} {...gallery} />
          ))}
      </SkipNavContent>
    </React.Fragment>
  )
}

export default Page
