const fs = require('fs')
const request = require('request')
const defaultUrl = 'https://api.lyiqk.cn/scenery'

interface RequestOpt {
  url: string
}
const downloadImage = (options: RequestOpt = {url: ''}, path: string) => {
  if (!options.url) options.url = defaultUrl
  return new Promise((resolve, reject) => {
    request
      .get(options)
      .on('response', (response: any) => {
        console.log('img type:', response.headers['content-type'])
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (e:any) => {
        console.log('pipe error', e)
        reject(e)
      })
      .on('finish', () => {
        resolve('ok')
      })
      .on('close', () => {
        console.log('close')
      })
  })
}

module.exports = downloadImage
