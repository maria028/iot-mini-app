/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:52:53
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-06 15:55:33
 * @Description:
 */
import { FC } from "react";
import { Provider } from "react-redux";

import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import "./app.scss";
import "./assets/font/iconfont.css";

const App: FC = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={children} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default App;
