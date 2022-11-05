import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 首页-引导页背景粒子插件
import VueParticles from 'vue-particles'

import { cpnsRegister } from './plugins'

import undrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueParticles)
app.use(cpnsRegister)
app.use(undrawUi)
app.mount('#app')
