// env 向外暴露的服务器请求地址、api请求地址等集合

const apiEnv: ApiEnv = 'dev'

const envMap = {
  dev: {
    baseUrl: 'http://m.dev.xxx.com',
    apiBaseUrl: 'http://192.168.124.64:8000/api/',
  },
  beta: {
    baseUrl: 'http://m.beta.xxx.com',
    apiBaseUrl: 'https://m.betaapi.xxx.com',
  },
  prod: {
    baseUrl: 'https://m.xxx.com',
    apiBaseUrl: 'https://m.api.xxx.com',
  },
  local: {
    baseUrl: 'http://m.dev.xxx.com',
    apiBaseUrl: 'https://m.devapi.xxx.com',
  },
}

type ApiEnv = keyof typeof envMap
type Env<T extends ApiEnv> = {
  apiEnv: T
} & typeof envMap[T]

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv])
}

const env = createEnv(apiEnv)
export default env
