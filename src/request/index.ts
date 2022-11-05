import Request from './basic'
const request = new Request({
  baseURL: 'http://localhost:3000',
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
