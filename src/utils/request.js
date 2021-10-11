import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { getToken, removeToken } from "./auth";
import { ElMessage } from "element-plus";

// 创建axios实例
const service = axios.create({
  baseURL: "/api", // api的base_url
  timeout: 3000, // 请求超时时间
  withCredentials: true
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [
  //   // eslint-disable-next-line no-unused-vars
  //   function(data) {
  //     /* eslint-disable no-undef */
  //     // return jsonlint.parse(data);
  //   }
  // ]
});

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(process.env);
    // 此处写入你要访问的地址，打包后使用
    if (process.env.NODE_ENV === "production") {
      config.baseURL = "";// 此处写入你要访问的地址，打包后使用
    }
    config.headers["token"] = getToken();
    config.headers["Accept"] = "*/*";
    // config.headers["unique_id"] = localStorage.getItem("fingerprint");
    // if (config.mock) {
    //   config.baseURL = "/mock";
    // }
    if (config.formData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

const handlerErrorMsg = message => {
  ElMessage.error(message);
};

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
      // if (response.data.code === 200) {
      //   return response.data.data ?? response.data;
      // } else if (response.data.code === 500 || response.data.errCode === 500) {
      //   if (!response.config.callback) {
      //     handlerErrorMsg(response.data.msg);
      //   }
      //   if (response.data.msg === "登录状态已过期") {
      //     removeToken();
      //   }
      //   return Promise.reject(response.data);
      // } else if (authCode[response.data.code]) {
      //   handlerErrorMsg(response.data.msg);
      //   removeToken();
      //   return Promise.reject(response.data);
      // } else {
      //   if (!response.config.callback) {
      //     handlerErrorMsg(response.data.msg);
      //   }
      //   if (response.data.msg === "登录状态已过期") {
      //     removeToken();
      //   }
      //   return Promise.reject(response.data);
      // }
    } else {
      handlerErrorMsg("系统正忙，请稍后再试。。。");
      return Promise.reject(response.data);
    }
  },
  error => {
    handlerErrorMsg("系统正忙，请稍后再试。。。");
    return Promise.reject(error);
  }
);

export default service;
