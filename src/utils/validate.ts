/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2023-10-08 15:38:58
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-01 17:52:52
 * @Description:验证方法
 */

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
