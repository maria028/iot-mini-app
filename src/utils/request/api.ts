/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 14:50:20
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:53:33
 * @Description:
 */
/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 14:50:20
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-01 16:58:47
 * @Description: 请求
 */
import Taro from "@tarojs/taro";
import { responseError } from "./error";
import { getSign } from "./sign";
import { verifyUrl, serialize } from "./verify";
import { ParamsType, OptionType } from "./RequestType";
import storage from "../storage";

const baseProxy = "/api";
const API_ROOT = "https://iot.hzwaterit.com";

export default {
    baseOptions(params: ParamsType, method = "GET") {
        let { url, data } = params;

        const option: OptionType = {
            url: `${API_ROOT}${baseProxy}${url}`,
            data: data,
            method: method,
            header: {
                "content-type": params.contentType || "application/json" // 默认
            },
            success(res: any) {
                console.log("res", res);
                //需要不提示返回信息的接口
                if (verifyUrl(params, "cMsg") || params?.responseType == "blob") {
                    return res.data;
                } else if (res.data.code == 8000000) {
                    return res.data;
                } else if (res.data.code == -7000000) {
                    // 小程序token过期  重新静默登录
                    // loginSilent();  todo
                    return res.data;
                } else {
                    responseError(res);
                }
            },
            error(e: any) {
                console.error("api", "请求接口出现问题", e);
            }
        };

        //需要加签名访问的接口
        if (verifyUrl(option, "sign")) {
            let param: any = {};
            if (option.method == "GET") {
                param = option.data;
            }
            option.url += `?${serialize(getSign(param))}`;
        } else {
            // header携带access_token
            option.header["Fawkes-Auth"] = `${storage.get("access_token")}`;
        }
        return Taro.request(option);
    },
    get(url?: string, data?: object, responseType?: string) {
        let option = { url, data, responseType };
        return this.baseOptions(option);
    },
    post(url?: string, data?: object, contentType?: string) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }
};
