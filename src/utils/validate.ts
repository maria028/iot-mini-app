/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2023-10-08 15:38:58
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 14:38:07
 * @Description:验证方法
 */

import Taro from "@tarojs/taro";

/**
 * 判断是否为整数
 */
export function validatenum(num: string, type: number) {
    let regName = /[^\d.]/g;
    if (type == 1) {
        if (!regName.test(num)) return false;
    } else if (type == 2) {
        regName = /[^\d]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断是否为小数
 */
export function validatenumord(num: string, type: number) {
    let regName = /[^\d.]/g;
    if (type == 1) {
        if (!regName.test(num)) return false;
    } else if (type == 2) {
        regName = /[^\d.]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断是否为空
 */
export function validatenull(val: any) {
    if (typeof val == "boolean") {
        return false;
    }
    if (typeof val == "number") {
        return false;
    }
    if (val instanceof Error) return val.message === "";

    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}") return true;
    } else {
        if (val == "null" || val == null || val == "undefined" || val == undefined || val == "") return true;
        return false;
    }
    return false;
}

/**
 *  返回金额数值
 *  限制整数位只能为0-9999之间的数字
 *	最多两位小数
 *	首位为小数点时，变成0.
 *	只能输入一个小数点
 */
export function checkAmount(val: string) {
    let price: string = val;
    if (price.indexOf(".") < 0 && price != "") {
        //'超过4位则大于1万元'
        if (price.length > 4) {
            price = price.substring(0, price.length - 1);
            Taro.showToast({
                title: "金额最高不能超过1万元",
                icon: "none"
            });
        } else {
            price = parseFloat(price).toString();
        }
    } else if (price.indexOf(".") == 0) {
        //'首位小数点情况'
        price = price.replace(/[^$#$]/g, "0.");
        price = price.replace(/\.{2,}/g, ".");
    } else if (!/^(\d?)+(\.\d{0,2})?$/.test(price)) {
        //去掉最后一位
        price = price.substring(0, price.length - 1);
    }
    return price;
}
