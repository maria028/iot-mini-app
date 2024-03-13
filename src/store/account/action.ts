/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-11 11:09:52
 * @Description:
 */
import * as USER from "./action-type";

// 保存平台用户信息
export const SAVE_ACCOUNT_LIST = (action: any) => {
    return {
        type: USER.SAVE_ACCOUNT_LIST,
        userInfoPlat: action.data
    };
};
