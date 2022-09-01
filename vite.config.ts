import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import apienv from './src/config/env'
// https://vitejs.dev/config/  ---小北

// const pathResolve = (dir: string) => resolve(__dirname, dir)
export default defineConfig({
  plugins: [uni()],
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
  },
  resolve: {
    //设置文件路径别名，方便路径引用，减少代码维护
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      views: path.resolve(__dirname, 'src/views'),
      components: path.resolve(__dirname, 'src/components'),
      static: path.resolve(__dirname, 'src/static'),
    },
  },
  // base: "./", // 设置公共基础路径
  // 设置代理，根据我们项目实际情况配置
  server: {
    port: 3000,
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域 --
    base: './ ', //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: apienv.apiBaseUrl, // 后端服务实际地址
        changeOrigin: true, //开启代理
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
