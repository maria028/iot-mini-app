/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:04:22
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-05 09:07:21
 * @Description: 对应/reducer/index.js
 */
import { combineReducers } from "redux";
import counter from "./counter/reducer";

export default combineReducers({ counter });