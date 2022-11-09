import Request from './basic'
const request = new Request({
  baseURL: 'http://139.9.48.26:3000',
  // process.env.NODE_ENV === 'production'
  //   ? 'http://139.9.48.26:3000'
  //   : 'http://localhost:3000',
  timeout: 5000,
  interceptors: {
    requestInterceptorsSuc(config) {
      const token = localStorage.getItem('cyblog-user-info')
      if (token) {
        config.headers = {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      }
      return config
    }
  }
})
export { request }
