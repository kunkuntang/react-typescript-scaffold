import Axios, { AxiosRequestConfig } from "axios";
import config from "@/config";
import { message } from "antd";

const axiosConfig = config.axios;
const baseURL = axiosConfig.domain + axiosConfig.baseUrl + axiosConfig.apiVersion

export const axiosHttp = Axios.create({
    baseURL,
    // timeout: axiosConfig.timeout,
});

axiosHttp.interceptors.request.use(config => {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

axiosHttp.interceptors.response.use(response => {
  if(response.status === 200) {
    return response.data
  } else if (response.status === 500) {
    message.error('服务器出错，请重试')
  }
  return response;
})

export const post = (url:string, data: object, config?: AxiosRequestConfig | undefined) => {
  return axiosHttp.post(url, data, {
    xsrfCookieName: 'csrfToken',
    xsrfHeaderName: 'x-csrf-token',
    ...config,
  })
};

export const get = axiosHttp.get;

