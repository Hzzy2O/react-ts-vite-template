export interface GlobConfig {
  // 标题
  title: string;
  // 接口地址
  apiUrl: string;
  // 上传地址
  uploadUrl?: string;
  //  前缀
  urlPrefix?: string;
  // 短名
  shortName?: string;
}


export interface GlobEnvConfig {
  // Service interface url
  VITE_GLOB_API_URL: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_UPLOAD_URL: string
  VITE_GLOB_API_URL_PREFIX: string
}