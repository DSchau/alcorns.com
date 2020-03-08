const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const slugify = require('limax')
const path = require('path')

const downloadImage = require('./download-image')

const LINK_SELECTOR = `tr a`
const IMAGE_SELECTOR = `td a > img`
const EXCLUDE = [`squirrelmail`, `linksys-cam`]
const EXCLUDE_IMAGE = [`.gif`]

async function scrapeImages() {
  const browser = await puppeteer.launch({
    headless: false,
  })
  let images = {}
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 1200 })
    await page.goto('https://alcorns.com')
  
    let hrefs = await page.evaluate(
      ({ selector, exclude }) => {
        return Array.from(document.querySelectorAll(selector))
          .map(el => el.getAttribute('href'))
          .filter(href => {
            return !exclude.some(excludeHref => href.indexOf(excludeHref) !== -1)
          })
      },
      { selector: LINK_SELECTOR, exclude: EXCLUDE }
    )
  
  
    for (href of hrefs) {
      await page.goto(`https://alcorns.com/${href}`)
  
      const imagesOnPage = await page.evaluate(
        ({ selector, exclude }) => {
          return Array.from(document.querySelectorAll(selector)).map(el => {
            const imageHref = el.parentNode.getAttribute('href')
            const description = el.parentNode.parentNode.innerText
            return [description.trim() || imageHref, `https://alcorns.com/${imageHref}`]
          }).filter(href => {
            return !exclude.some(excludeHref => href.indexOf(excludeHref) !== -1)
          })
        },
        { selector: IMAGE_SELECTOR, exclude: EXCLUDE_IMAGE }
      )
  
      images[slugify(href)] = imagesOnPage
    }
  } catch (e) {
    console.error(e)
  } finally {
    browser.close()

    for (const folderName of Object.keys(images)) {
      const imagesPerPage = images[folderName]
      const folder = path.join(`images`, folderName)
      await fs.mkdirp(folder)

      console.log(`Downloading images for ${folderName} (${imagesPerPage.length})`)

      await Promise.all(
        imagesPerPage.map(([imageName, imageHref]) => {
          const ext = imageName.match(/\.(.+)/)
          const name = slugify(imageName.split('.').shift())
          const imageWithExtension = `${name}.${ext ? ext.pop() : 'jpg'}`
          return downloadImage(imageHref, path.join(folder, imageWithExtension))
            .catch(e => {
              console.error(`${imageWithExtension}: ${imageHref}`)
              console.error(e)
            })
        })
      )

    }
  }
}

scrapeImages()
