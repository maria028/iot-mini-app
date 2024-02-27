/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:07:42
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-05 09:42:02
 * @Description: 
 */
import { ADD, MINUS } from "./action-type";

export const add = () => {
  return {
    type: ADD
  };
};
export const minus = () => {
  return {
    type: MINUS
  };
};

// 异步的action
export function asyncAdd() {
  return (dispatch: (arg0: { type: string; }) => void) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}
