//配置APP全局信息，多语言国际化。版本号等。
// import i18n2 from '@/lang/index'
//
// const isProxy = i18n2.global.t('common.agreeUser')

export default {
  APP_NAME: '资本管理',
  APP_VERSION: '1.0.0',
  //默认关闭，国际化。如果你想使用国际化相关功能，请改为true
  i18n: {
    enable: false,
  },
  //关于应用
  about: {
    //应用名称
    // appName: 'uni-starter',
    //应用logo
    // logo: '/static/logo.png',
    //公司名称
    company: 'xxx有限公司',
    //口号
    // slogan: '云端一体应用快速开发模版',
    //政策协议
    agreements: [
      {
        title: '', //如果开启了多语言国际化，本配置将失效。请在 lang/en.js 和 lang/zh-Hans.js中配置
        url: '请填写用户服务协议链接', //对应的网络链接
      },
      {
        title: '《隐私政策》', //如果开启了多语言国际化，本配置将失效。请在 lang/en.js 和 lang/zh-Hans.js中配置
        url: '请填写隐私政策链接', //对应的网络链接
      },
    ],
    //应用的链接，用于分享到第三方平台和生成关于我们页的二维码
    download: '',
    //version
    version: '1.0.0', //用于非app端显示，app端自动获取
  },
}
