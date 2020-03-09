require('dotenv').config()
const contentful = require('contentful-management')
const fs = require('fs-extra')
const path = require('path')

const client = contentful.createClient({
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
})

const EXCLUDE = ['09-20lutsen-htm', '10-20rci-20oasis-20of-20the-20seas-htm']

async function upload() {
  const space = await client.getSpace(process.env.SPACE_ID)
  const env = await space.getEnvironment(`master`)

  const base = 'images'

  const images = await fs.readdir(base).then(dir => {
    return Promise.all(
      dir
        .filter(name => EXCLUDE.every(expr => expr !== name))
        .map(name => {
          return fs.readdir(path.join(base, name)).then(all => {
            return [path.join(base, name), all]
          })
        })
    )
  })

  for (const [dir, all] of images) {
    for (const src of all) {
      const fileName = `${dir.split('/').pop()} - ${src.split('.').shift()}`
      const contentType = `image/${src
        .split('.')
        .pop()
        .toLowerCase()}`
      const upload = await env.createUpload({
        file: await fs.readFile(path.join(dir, src)),
        contentType,
        fileName,
      })

      const asset = await env.createAsset({
        fields: {
          title: {
            'en-US': fileName,
          },
          description: {
            'en-US': `An image from ${src.split('.').pop()}`,
          },
          file: {
            'en-US': {
              fileName,
              contentType,
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id,
                },
              },
            },
          },
        },
      })

      await asset
        .processForLocale('en-US', { processingCheckWait: 2000 })
        .catch(e => {
          console.error(e.message)
        })

      console.log(`publishing`)

      const published = await asset.publish().catch(e => {
        console.error(e.message)
      })

      console.log(published)
    }
  }
}

upload()
