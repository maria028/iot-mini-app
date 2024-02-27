/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-06 10:42:45
 * @Description: 
 */
import { ADD, MINUS } from "./action-type";

const INITIAL_STATE = {
  num: 0
};

export default function counter(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      };
    default:
      return state;
  }
}
