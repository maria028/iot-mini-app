/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 17:18:51
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:53:05
 * @Description:url验证
 */
import { sign, cMsg, ignore, urlencoded } from "./url";
import { ParamsType } from "./RequestType";

function urlPattern(url: string) {
    let nurl = url.split("*").join("(.)*").split("(.)*(.)").join("*(.)");
    //   let nurl = url.replaceAll('*', '(.)*').replaceAll('(.)*(.)', '*(.)')
    nurl += "$";
    return nurl;
}
export function verifyUrl(config: ParamsType, type: string) {
    let array = type == "sign" ? sign : type == "urlencoded" ? urlencoded : cMsg;
    return array.find((item) => {
        return new RegExp(urlPattern(item)).test(config.url);
    });
}

export function verifyRequest(config: ParamsType, method: string) {
    return !ignore.find((item) => {
        return (
            new RegExp(urlPattern(item.url)).test(config.url) &&
            (item.httpMethod == "*" || item.httpMethod === method) &&
            item.scope !== "res"
        );
    });
}

export function verifyResponse(res: any) {
    return !ignore.find((item) => {
        return (
            new RegExp(urlPattern(item.url)).test(res.config.url) &&
            (item.httpMethod == "*" || item.httpMethod === res.config.method) &&
            item.scope !== "req"
        );
    });
}

//表单序列化
export function serialize(data: object) {
    let list: Array<string> = [];
    Object.keys(data).forEach((ele: any) => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
}
