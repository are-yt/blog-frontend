import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface Interceptors {
  requestInterceptorsSuc?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsFail?: (err: any) => void
  responseInterceptorsSuc?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorsFail?: (err: any) => void
}
export interface InstanceConfig {
  baseURL: string
  timeout?: number
  interceptors?: Interceptors
}
export interface RequestConfig extends AxiosRequestConfig {
  isLoading?: boolean
  interceptors?: Interceptors
}
