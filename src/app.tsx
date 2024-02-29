/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:52:53
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-28 11:15:12
 * @Description:
 */
import { FC } from "react";
import { Provider } from "react-redux";

import configStore from "./store";

import "./app.scss";
import "./assets/font/iconfont.css";

const store = configStore();

const App: FC = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
};

export default App;
