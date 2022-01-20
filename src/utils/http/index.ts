import { AUTH_KEY } from '@/enums/cacheEnum';
import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { useGlobSetting } from '@/hooks/setting';
// import { useMessage } from '@/hooks/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString } from '@/utils/is';
import { Persistent } from '@/utils/cache/persistent'
import { setObjToUrlParams, deepMerge } from '@/utils';
// import { useUserStoreWithOut } from '../../store/modules/userStore';
// import { TOKEN_KEY } from '@/enums/cacheEnum';
// import { ApiUrl } from '@/apis/sys/user';

const globSetting = useGlobSetting();
// const { createMessage } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const { data } = res;
    if (!data) {
      throw new Error('请求出错，请稍候重试');
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    // const { result, message } = data;
    // console.log(data);
    // // const { code } = result
    // // 这里逻辑可以根据项目进行修改
    // const hasSuccess = result && Reflect.has(result, 'code') && code === ResultEnum.SUCCESS;
    if (data) {
      return data;
    }

    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // let timeoutMsg = '';
    // switch (code) {
    //   case ResultEnum.TIMEOUT:
    //     // timeoutMsg = '登录超时,请重新登录!';
    //     // const userStore = useUserStoreWithOut();
    //     // userStore.setToken(undefined);
    //     // userStore.logout(true);
    //     break;
    //   default:
    //     if (message) {
    //       timeoutMsg = message;
    //     }
    // }

    throw new Error('请求出错，请稍候重试');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl,  joinParamsToUrl, } = options;

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() !== RequestEnum.GET) {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // createMessage.error(error.message)
    // const { t } = useI18n();
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    // const { response, code, message, config } = error || {};
    // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // const msg: string = response?.data?.error?.message ?? '';
    // const err: string = error?.toString?.() ?? '';
    // let errMessage = '';

    // try {
    //   if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    //     errMessage = t('sys.api.apiTimeoutMessage');
    //   }
    //   if (err?.includes('Network Error')) {
    //     errMessage = t('sys.api.networkExceptionMsg');
    //   }

    //   if (errMessage) {
    //     // if (errorMessageMode === 'modal') {
    //     //   createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    //     // } else if (errorMessageMode === 'message') {
    //     //   createMessage.error(errMessage);
    //     // }
    //     return Promise.reject(error);
    //   }
    // } catch (error) {
    //   throw new Error(error as unknown as string);
    // }

    // checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  const Authorization = Persistent.getSession(AUTH_KEY)
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON , Authorization },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'http://localhost:8080'
//   },
// });
