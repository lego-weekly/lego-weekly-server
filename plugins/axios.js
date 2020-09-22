import qs from 'qs'
export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = process.env.API_URL
  $axios.onRequest((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // console.log('Making request to ' + config.url)
  })

  $axios.onResponse((response) => {
    // console.log('Making response to ' + response.data.length)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
