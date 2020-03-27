import NODE_ENV from '../buildConfig';
import axios from 'axios'

import Qs from 'qs'

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: NODE_ENV.API_ROOT,
    timeout: 30000,
    headers: {},
    responseType: 'json',
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
})

export default {
    init(Toast) {
        // 拦截器zyh
        axiosInstance.interceptors.request.use(config => {
            //添加加载框
            if(!config.data.noToast){
                // Toast.loading('加载中...', 0);
            }else{
                config.noToast = true;
            }
            return config
        }, function (error) {
            return Promise.reject(error);
        });
        axiosInstance.interceptors.response.use(function (response) {
            //隐藏加载框
            if(!response.config.noToast){
                // Toast.hide();
            }
            //000
            if (response.data.msg) {
                // Toast.fail(response.data.msg)
            }
            try {
                if (response.data.code == '999' || response.data.code == '99999' || response.data.msg) {
                    return Promise.reject(response.data);
                }
            } catch (e) {

            }
            return response.data;
        }, function (error) {
            //隐藏加载框
            // Toast.hide();
            // Toast.fail('服务器错误', 1);
            return Promise.reject(error);
        });
    },
    axiosInstance
}
