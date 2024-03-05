/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 17:08:45
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:49:43
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
    return api.post("/wechat-service/wechat/login/getToken", {
        code
    });
}
