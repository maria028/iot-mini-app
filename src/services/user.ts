/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 17:08:45
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 10:06:17
 * @Description:用户相关
 */
import api from "@/utils/request/api";

//业务系统登录  获取token以及用户信息
export function getTokenPlat(data: object) {
    return api.post(
        "/sys-auth/oauth/token",
        {
            scope: "all",
            grant_type: "password",
            ...data
        },
        "application/x-www-form-urlencoded"
    );
}

// 微信静默登录 获取token
export function wxLogin(code: string) {
    return api.post(
        "/wechat-service/wechat/login/getToken",
        {
            code
        },
        "application/x-www-form-urlencoded"
    );
}

// 业务系统 根据手机号获取用户
export function getUserInfoPlat(phone: string | number) {
    return api.get("/fawkes-service/user/queryUserInfo", {
        phone
    });
}

// 获取微信手机号
export function getWxPhoneNumber(code: string) {
    return api.post(
        "/wechat-service/wechat/login/getPhoneNumber",
        {
            code
        },
        "application/x-www-form-urlencoded"
    );
}

// 获取微信用户信息
export function getWXuserInfo() {
    return api.get("/wechat-service/wechat/login/getUserDetailByToken", {});
}

// 修改微信用户信息
export function updateWXuserInfo(params: {
    nickname?: string;
    avatarUrl?: string;
    gender?: string | number;
    country?: string;
    province?: string;
    city?: string;
    userData?: any;
}) {
    return api.post("/wechat-service/wechat/user/updateAppUserinfo", params);
}
