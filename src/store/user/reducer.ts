/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-06 11:48:52
 * @Description:
 */
import { GET_USER_INFO_PLAT } from "./action-type";

const defaultState = {
    userInfoPlat: {} //平台用户信息
};

export default function user(state = defaultState, action: any) {
    switch (action.type) {
        case GET_USER_INFO_PLAT:
            return {
                ...state,
                userInfoPlat: action.data
            };
        default:
            return state;
    }
}
