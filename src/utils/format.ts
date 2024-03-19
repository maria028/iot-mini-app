/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-13 15:47:39
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-19 14:28:38
 * @Description: 内容格式化
 */

import { validatenull } from "./validate";

// constData中的枚举值过滤器
export const formatConstData = (value: any, constants: Array<any>, column = "text") => {
    try {
        if (validatenull(value)) {
            return "";
        } else {
            let find = constants.find((i: { value: any }) => i.value == value);
            return find ? find[column] : "";
        }
    } catch (e) {
        console.log(e);
        return "";
    }
};

// 格式化手机号
export const formatPhone = (value: string) => {
    if (!value) return "";
    const reg = /(\d{3})\d{4}(\d{4})/; // 正则表达式
    return String(value).replace(reg, "$1****$2"); // 返回加密后的电话号码
};
// 格式化金额 分->元
export const formatAmountFenToYuan = (value: string | number) => {
    if (!value) return 0;
    return (Number(value) / 100).toFixed(2);
};
