import axios from 'axios';
import { message } from 'antd';

const axiosService = axios.create({
    baseURL: '/api',
});

axiosService.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// request拦截器
axiosService.interceptors.request.use(
    (config) => {
        if (config.data && config.data.$skipAuthHandler) {
            config.$skipAuthHandler = true;
            delete config.data.$skipAuthHandler;
        }
        if (config.params && config.params.$skipAuthHandler) {
            config.$skipAuthHandler = true;
            delete config.params.$skipAuthHandler;
        }
        if (config.contenttext) {
            config.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
            config.transformRequest = (data, headers) => {
                return data;
            }
        }
        if (config.upload) {
            config.headers.common['Content-Type'] = 'multipart/form-data';
            config.transformRequest = (data, headers) => {
                let param = new FormData();
                let name;
                for (name in data) {
                    let value = data[name];
                    if (value instanceof Object) {
                        if (value.length) {
                            for (let i = 0; i < value.length; i++) {
                                param.append(name, value[i], value[i].name);
                            }
                        } else {
                            param.append(name, value, value.name);
                        }
                    } else {
                        param.append(name, value);
                    }
                }
                return param;
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

axiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        var config = error.config;
        const err = error.response;

        if (err.status === 401 && !!err.config && !err.config.$skipAuthHandler) {
            window.location.href = '/login';
        } else if (err.status === 400) {
            message.error('参数传递错误！')
        } else if (err.status === 500) {
            message.error('请求发生错误！')
        }
    }
);
export default axiosService;