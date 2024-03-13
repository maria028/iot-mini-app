/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-11 11:09:42
 * @Description:
 */
import { SAVE_ACCOUNT_LIST } from "./action-type";

const defaultState = {
    accountList: {} //已绑定的户列表
};

export default function account(state = defaultState, action: any) {
    switch (action.type) {
        case SAVE_ACCOUNT_LIST:
            return {
                ...state,
                accountList: action.data
            };
        default:
            return state;
    }
}
