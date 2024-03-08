/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 14:50:20
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-08 12:47:48
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
import { loginSilent } from "@/utils/wxLogin";

const baseProxy = "/api";
const API_ROOT = "https://iot.hzwaterit.com";

export default {
    baseOptions(params: ParamsType, method: string) {
        let { url, data } = params;
        //需要加签名访问的接口
        if (verifyUrl(params, "sign")) {
            let param: any = {};
            if (method == "GET") {
                param = data;
            }
            url += `?${serialize(getSign(param))}`;
        } else {
            // header携带access_token
            // option.header["Fawkes-Auth"] = `${storage.getItem("access_token")}`;
        }
        return new Promise<any>((resolve, reject) => {
            const option: OptionType = {
                url: `${API_ROOT}${baseProxy}${url}`,
                data: data,
                method: method,
                header: {
                    "content-type": params.contentType || "application/json", // 默认
                    token: Taro.getStorageSync("TOKEN") // header携带token 默认所有接口携带
                },
                success(res: any) {
                    // console.log("Taro.request  res==", res);
                    //需要不提示返回信息的接口
                    if (verifyUrl(params, "cMsg") || params?.responseType == "blob") {
                        resolve(res.data);
                    } else if (res.data.code == 8000000) {
                        resolve(res.data);
                    } else if (res.data.code == -7000000) {
                        // 小程序token过期  重新静默登录
                        loginSilent();
                        resolve(res.data);
                    } else {
                        reject(res);
                        responseError(res);
                    }
                },
                error(e: any) {
                    console.error("api", "请求接口出现问题", e);
                    reject(e);
                }
            };
            Taro.request(option);
        });
    },
    get(url?: string, data?: object, responseType?: string) {
        let option = { url, data, responseType };
        return this.baseOptions(option, "GET");
    },
    post(url?: string, data?: object, contentType?: string) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }
};
