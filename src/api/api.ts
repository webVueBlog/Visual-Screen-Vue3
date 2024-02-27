import type {AxiosRequestConfig, AxiosResponse} from "axios"
import axios from 'axios';
import {RequestEnum, StorageEnum} from "@/enums"
import {getLocalStorage} from "@/utils" // 获取本地存储
import UtilVar from "../config/UtilVar"; // 全局变量
let baseUrl = UtilVar.baseUrl//api;
const CancelToken = axios.CancelToken;// 取消请求

export { baseUrl };// 导出baseUrl
// axios.defaults.withCredentials = true;
// 添加请求拦截器
axios.interceptors.request.use(function (config: AxiosRequestConfig):any {
    // 在发送请求之前做些什么 传token
    let token: any = getLocalStorage(StorageEnum.GB_TOKEN_STORE);// 获取token
    if (token) {
        // @ts-ignore
        config.headers.common[RequestEnum.GB_TOKEN_KEY] = token;// 添加请求头
    }
    // @ts-ignore
    config.headers['Content-Type'] = "application/json;charset=utf-8";

    return config;
}, function (error: any) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
});

export type Params = { [key: string]: string | number };// 参数类型
export type FileConfig = {// 文件上传配置
    setCancel?: Function;// 取消请求
    onProgress?: Function;// 进度
    [key: string]: any;// 其他配置
};
/**
 * @响应拦截
 */
axios.interceptors.response.use((response: AxiosResponse) => {
    /**
     * @code 登录过期 token验证失败 根据后端调 
     */
    // console.log(response)
    if (response.status !== 200) {// 请求失败
        return Promise.reject(response)// 返回错误信息
    }
    if (response.data.code == UtilVar.code) {// 登录过期
        // router.push("/login")
        return response.data// 返回错误信息
    }
    return response.data
}, (error: any) => {
    // console.log(error);
    let err = {
        success: false,
        msg: "未知异常，请联系管理员！"
    }
    if (JSON.stringify(error).indexOf('Network Error') != -1) {// 网络错误
        err.msg = "网络错误或服务错误！"// 返回错误信息
    }
    // console.log(err);
    return Promise.reject(err)
})

//判断是否是加密参数，是的话处理
let isEncryptionParam = (params: Params) => {//判断是否是加密参数，是的话处理
    return params
}
/**
 * @description: get 请求方法
 * @param {string} url 请求地址
 * @param {Params} params 请求参数
 * @return {*}
 */
export const GET = async (url: string, params: Params): Promise<any> => {
    try {
        params = isEncryptionParam(params)//判断是否是加密参数，是的话处理
        return await axios.get(`${baseUrl}${url}`, {// 请求地址
            params: params,
        });
    } catch (error) {
        return error;
    }
}
/**
 * @description: post请求方法
 * @param {any} url
 * @param {any} params
 * @return {any} 
 */
export const POST = async (url: string, params: Params): Promise<any> => {
    try {
        params = isEncryptionParam(params)
        return await axios.post(`${baseUrl}${url}`, params,
        );
    } catch (error) {
        return error;
    }
}
/**
 * @description: 没有基地址 访问根目录下文件
 * @param {string} url
 * @param {Params} params
 * @return {*}
 */
export const GETNOBASE = async (url: string, params?: Params): Promise<any> => {
    try {
        return await axios.get(url, {
            params: params,
        });
    } catch (error) {
        return error;
    }
}


// 定义文件类型提交方法
interface fileconfigs {
    [headers: string]: {
        'Content-Type': string
    }
}
let configs: fileconfigs = {
    "headers": { 'Content-Type': 'multipart/form-data' },
}
/**
 * @description: @文件类型提交方法
 * @param {string} url
 * @param {Params} params
 * @param {FileConfig} config
 * @return {*}
 */
export const FILEPOST = async (url: string, params: Params, config: FileConfig = {}): Promise<any> => {
    try {
        return await axios.post(`${baseUrl}${url}`, params, {
            ...configs,
            cancelToken: new CancelToken(function executor(c: any) {
                config.setCancel && config.setCancel(c)
            }),
            // 上传进度
            onUploadProgress: (e: any) => {
                if (e.total > 0) {
                    e.percent = e.loaded / e.total * 100;
                }
                config.onProgress && config.onProgress(e)
            },

        });
    } catch (err) {
        return err;
    }
}

/**
 * 下载文档流
 * @param {config.responseType} 下载文件流根据后端 配置   arraybuffer || blod
 */
export const FILE = async (config: FileConfig = {}) => {

    try {
        return await axios({
            method: config.method || 'get',
            url: `${baseUrl}${config.url}`,
            data: config.body || {},
            params: config.param || {},
            responseType: config.responseType || 'blod',
            onDownloadProgress: (e: any) => {
                // console.log(e,e.currentTarget)
                // if (e.currentTarget.response.size > 0) {
                //     e.percent = e.loaded / e.currentTarget.response.size * 100;
                // }
                // event.srcElement.getResponseHeader('content-length')
                config.onProgress && config.onProgress(e)
            },
        });
    } catch (err) {
        return err;
    }
}


export const PUT = async (url: string, params: Params) => {
    try {
        params = isEncryptionParam(params)
        return await axios.put(`${baseUrl}${url}`, params);
    } catch (error) {
        return error;
    }
}
export const DELETE = async (url: string, params: Params) => {
    try {
        params = isEncryptionParam(params)
        return await axios.delete(`${baseUrl}${url}`, {data: params});
    } catch (error) {
        return error;
    }
}


// switch (error.response?.status) {
//     case 400:
//       error.message = '请求错误(400)';
//       break;
//     case 401:
//       error.message = '未授权(401)';
//       break;
//     case 403:
//       error.message = '拒绝访问(403)';
//       break;
//     case 404:
//       error.message = '请求出错(404)';
//       break;
//     case 408:
//       error.message = '请求超时(408)';
//       break;
//     case 500:
//       error.message = '服务器错误(500)';
//       break;
//     case 501:
//       error.message = '服务未实现(501)';
//       break;
//     case 502:
//       error.message = '网络错误(502)';
//       break;
//     case 503:
//       error.message = '服务不可用(503)';
//       break;
//     case 504:
//       error.message = '网络超时(504)';
//       break;
//     case 505:
//       error.message = 'HTTP版本不受支持(505)';
//       break;
//     default:
//       error.message = `连接出错(${error.response?.status})!`;
//   }