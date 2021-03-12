import axios, { AxiosResponse, AxiosRequestConfig, Canceler, AxiosPromise } from 'axios';
import { message } from 'ant-design-vue';

interface SourcesTypes {
    umet: string;
    cancel: Canceler;
}
interface ResponseTypes {
    code: number;
    data: any;
    msg?: string;
    message?: string;
}
let prefix = window.location.pathname;
let baseURL = '';
if (prefix === '/') {
    prefix = '';
}

baseURL = `${prefix}/api/hmmis`;

/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000; // 10秒
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;
/**
 * 设置post请求头
 * application/json;charset=UTF-8   JSON格式
 * application/x-www-form-urlencoded;charset=UTF-8  Form表单格式
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

const { CancelToken } = axios;
const sources: SourcesTypes[] = []; // 定义数组用于存储每个ajax请求的取消函数及对应标识

/**
 * 请求防抖当一个url地址被请求多次就会取消前一次请求
 */
const removeSource = (config: AxiosRequestConfig) => {
    sources.forEach((item, index) => {
        // 当多次请求相同时，取消之前的请求
        if (config.url && config.method && item.umet === `${config.url}&${config.method}`) {
            item.cancel('取消请求');
            sources.splice(index, 1);
        }
    });
};

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
    (config) => {
        const newConfig = config;
        removeSource(config);
        newConfig.cancelToken = new CancelToken((c) => {
            // 将取消函数存起来
            if (newConfig.url && newConfig.method) {
                sources.push({
                    umet: `${newConfig.url}&${newConfig.method}${JSON.stringify(newConfig.params || newConfig.data)}`,
                    cancel: c,
                });
            }
        });
        if (newConfig.data) {
            newConfig.data = JSON.stringify(newConfig.data);
        }
        return newConfig;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
axios.interceptors.response.use(
    (res: AxiosResponse<ResponseTypes>) => {
        if (res.data.code !== 200) {
            const msg = res.data.message || res.data.msg || '请求错误';
            void message.error(msg);

            throw new Error(msg);
        }
        removeSource(res.config);

        return res;
    },
    (error) => {
        if (!error.response) return;
        switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        // case 401:
        //     if (window.location.hostname === 'localhost') {
        //         axios.post('/api/v1/login?client_name=form', {
        //             userName: 'lixiaoyao4_vendor',
        //             password: 123456,
        //         });
        //     } else {
        //         window.location = error.response.headers.locationurl;
        //     }
        //     break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        // case 403:
        //     message.error({ content: '登录过期，请重新登录', duration });
        //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        //     if (window.location.hostname === 'localhost') {
        //         axios.post('/api/v1/login?client_name=form', {
        //             userName: 'lixiaoyao4_vendor',
        //             password: 123456,
        //         });
        //     } else {
        //         window.location = error.response.headers.locationurl;
        //     }
        //     break;

        // 404请求不存在
        case 404: {
            // message.error({ content: '访问资源不存在', duration });
            break;
        }
        // 其他错误，直接抛出错误提示
        default:
            console.log(error);
            // message.error({ content: error.response.data.message.error, duration });
        }
        return Promise.reject(error.response);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {AxiosResponse} params [请求时携带的参数]
 */
function get(url: string, params = {}): Promise<AxiosResponse<ResponseTypes>> {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {AxiosResponse} params [请求时携带的参数]
 */
function post(url: string, params = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// 对外暴露
export { post, get };
