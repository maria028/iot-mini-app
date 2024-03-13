/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 09:51:45
 * @Description:
 */
import * as USER from "./action-type";

// 保存平台用户信息
export const SAVE_USER_INFO_PLAT = (action: any) => {
    return {
        type: USER.SAVE_USER_INFO_PLAT,
        userInfoPlat: action.data
    };
};

// 保存微信用户信息
export const SAVE_USER_INFO = (action: any) => {
    return {
        type: USER.SAVE_USER_INFO,
        userInfoPlat: action.data
    };
};
