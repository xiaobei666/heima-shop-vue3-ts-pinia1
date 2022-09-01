import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh-CN'
import uniStarterConfig from '../config/app'

// 默认语言 中文模式

const uniStarter = uniStarterConfig.i18n.enable
// 如果配置开启国际化就是英语， 否则是 zh 汉语
const langDefault = uniStarter === false ? 'en' : 'zh'
const i18n: any = createI18n({
  globalInjection: true, // 全局使用简易变量$t
  // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
  locale: langDefault || uni.getStorageSync('locale') || navigator.language.slice(0, 2),
  messages: {
    zh,
    en,
  },
})
export default i18n
