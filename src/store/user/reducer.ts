/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 09:51:55
 * @Description:
 */
import { SAVE_USER_INFO_PLAT, SAVE_USER_INFO } from "./action-type";

const defaultState = {
    userInfoPlat: {}, //平台用户信息
    userInfo: {} //微信用户信息
};

export default function user(state = defaultState, action: any) {
    switch (action.type) {
        case SAVE_USER_INFO_PLAT:
            return {
                ...state,
                userInfoPlat: action.data
            };
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            };
        default:
            return state;
    }
}
