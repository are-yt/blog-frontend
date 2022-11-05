import type { App } from 'vue'
import { ElInput, ElButton, ElPagination, ElUpload } from 'element-plus'
import 'element-plus/dist/index.css'
const cpns = [ElInput, ElButton, ElPagination, ElUpload]
export const cpnsRegister = (app: App): void => {
  if (cpns.length) {
    cpns.forEach(item => {
      app.component(item.name, item)
    })
  }
}
