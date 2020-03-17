export const getDataFromContentBlocks = contentBlocks => {
  return contentBlocks.reduce((merged, block) => {
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
}
