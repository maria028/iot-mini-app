/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 17:23:10
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-06 11:49:38
 * @Description:
 */
import Taro from "@tarojs/taro";
// import { MODE_TYPE } from "@/constants/common";

export const responseError = (response: any) => {
    let message = "";
    if (response.statusCode) {
        switch (response.statusCode) {
            case 400:
                message = response.data.message || "错误请求";
                break;
            case 401:
                switch (response.data.code) {
                    case -8000160:
                        message = "无证书提示:" + response.data.message;
                        break;
                    case -8000150:
                        message = response.data.message;
                        break;
                    default: {
                        // storage.remove("access_token");
                        message = response.data.message;
                        // todo
                        // setTimeout(() => {
                        //     // 未登录，无权限访问
                        //     if (storage.get("mode") == MODE_TYPE.DEV) {
                        //         store.commit("setIsLogin", false); //清除登录
                        //         // 运维角色
                        //         Taro.reLaunch({
                        //             url: `/pages/login/login`
                        //         });
                        //     } else {
                        //         // 普通用户
                        //         Taro.reLaunch({
                        //             url: `/pages/profile/profile`
                        //         });
                        //     }
                        // }, 2000);
                    }
                }
                break;
            case 403:
                message = "拒绝访问";
            case 404:
                message = "请求错误,未找到该资源";
                break;
            case 405:
                message = "请求方法未允许";
                break;
            case 408:
                message = "请求超时";
                break;
            case 500:
                message = "服务器端出错";
                break;
            case 501:
                message = "网络未实现";
                break;
            case 502:
                message = "网络错误";
                break;
            case 503:
                message = "服务不可用";
                break;
            case 504:
                message = "网络超时";
                break;
            case 505:
                message = "http版本不支持该请求";
                break;
            default:
                message = `连接错误${response.status}`;
                break;
        }
    }
    if (message) {
        Taro.showToast({
            title: message,
            icon: "none",
            mask: true
        });
    }
};
