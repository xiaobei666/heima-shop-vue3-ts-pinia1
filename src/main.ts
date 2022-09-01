import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import vueI18n from './lang/index'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  //使用pinia作为全局状态管理
  app.use(createPinia())
  // 多语言国际
  app.use(vueI18n)
  return {
    app,
  }
}
