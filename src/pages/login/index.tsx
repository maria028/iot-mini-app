/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-27 14:39:32
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-08 12:41:19
 * @Description:首页
 */
import { useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
import CNavBar from "@/components/CNavBar";
import { Button, Input, Image } from "@nutui/nutui-react-taro";
import { Marshalling, Eye } from "@nutui/icons-react-taro";
import { pwdEncrypt } from "@/utils/encryption/pwd";
import { getTokenPlat } from "@/services/user";
import { useDispatch } from "react-redux";
import storage from "@/utils/storage";
import { MODE_TYPE } from "@/constants/common";
import logoPng from "@/assets/images/logo.png";

import "./index.scss";

export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    useLoad(async () => {
        console.log("Page loaded.");
    });

    const loginHandle = () => {
        if (!username) {
            Taro.showToast({
                title: "请输入您的用户名",
                icon: "none",
                duration: 2000
            });
            return;
        }
        if (!password) {
            Taro.showToast({
                title: "请输入您的密码",
                icon: "none",
                duration: 2000
            });
            return;
        }
        Taro.showLoading({ title: "", mask: true });
        getTokenPlat({
            username: username,
            password: pwdEncrypt(password)
        })
            .then((res: any) => {
                if (res.data) {
                    dispatch({ type: "GET_USER_INFO_PLAT", data: res.data });
                    storage.setItem("isLogin", true); // 已经登录
                    storage.setItem("mode", MODE_TYPE.DEV);
                    Taro.showToast({
                        title: "登录成功！",
                        icon: "success",
                        duration: 2000
                    });
                    setTimeout(() => {
                        //跳转首页
                        Taro.switchTab({ url: "/pages/index/index" });
                    }, 1000);
                }
            })
            .finally(() => {
                Taro.hideLoading();
            });
    };

    return (
        <View className="login">
            {/* 标题栏 */}
            <CNavBar title="登录" back={<></>} fixed placeholder />
            {/* logo */}
            <Image src={logoPng} mode={"widthFix"} width={120}></Image>
            <View className="form">
                {/* 账号 */}
                <View className="label">账号</View>
                <View className="input">
                    <Input value={username} placeholder="请输入账号" type="text" onChange={(val: string) => setUsername(val)} />
                </View>
                {/* 密码 */}
                <View className="label">密码</View>
                <View className="input">
                    <Input
                        value={password}
                        placeholder="请输入密码"
                        type={hidePassword ? "password" : "text"}
                        onChange={(val: string) => setPassword(val)}
                    />
                    <View style={{ padding: "0 15px" }}>
                        {hidePassword ? (
                            <Marshalling onClick={() => setHidePassword(false)} />
                        ) : (
                            <Eye onClick={() => setHidePassword(true)} />
                        )}
                    </View>
                </View>
                {/* 登录按钮 */}
                <Button type="primary" size="large" block style={{ marginTop: "80px" }} onClick={loginHandle}>
                    登录
                </Button>
            </View>
        </View>
    );
}
