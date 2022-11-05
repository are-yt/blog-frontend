import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { InstanceConfig, RequestConfig } from './types'
import { ElLoading } from 'element-plus'
class Request {
  private axios: AxiosInstance
  constructor(config: InstanceConfig) {
    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 5000
    })
    // 创建axios实例时传入的请求拦截器
    this.axios.interceptors.request.use(
      config.interceptors?.requestInterceptorsSuc,
      config.interceptors?.requestInterceptorsFail
    )
    // 创建axios实例时传入的响应拦截器
    this.axios.interceptors.response.use(
      config.interceptors?.responseInterceptorsSuc,
      config.interceptors?.responseInterceptorsFail
    )
  }
  request(config: RequestConfig): Promise<any> {
    let loading: any = null
    // 请求时传入了单独的拦截器
    this.axios.interceptors.request.use(
      config.interceptors?.requestInterceptorsSuc,
      config.interceptors?.requestInterceptorsFail
    )
    this.axios.interceptors.response.use(
      config.interceptors?.responseInterceptorsSuc,
      config.interceptors?.responseInterceptorsFail
    )
    if (config.isLoading) {
      // 请求时传入了loading: true
      loading = ElLoading.service()
    }
    return new Promise((resolve, reject) => {
      // 开启请求
      this.axios
        .request(config)
        .then(res => {
          // 关闭loading
          loading && loading.close()
          resolve(res)
        })
        .catch(err => {
          // 关闭loading
          loading && loading.close()
          reject(err)
        })
    })
  }
}
export default Request
