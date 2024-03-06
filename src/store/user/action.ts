/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-06 11:29:39
 * @Description:
 */
import * as USER from "./action-type";

// 获取平台用户信息
export const GET_USER_INFO_PLAT = (action: any) => {
    return {
        type: USER.GET_USER_INFO_PLAT,
        userInfoPlat: action.data
    };
};
