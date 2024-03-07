/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-27 14:39:32
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-07 10:20:34
 * @Description:首页
 */
import { useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
import CNavBar from "@/components/CNavBar";
import { Form, Button, Input } from "@nutui/nutui-react-taro";
import { pwdEncrypt } from "@/utils/encryption/pwd";
import { getTokenPlat } from "@/services/user";
import { useDispatch } from "react-redux";

import "./index.scss";

export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useLoad(async () => {
        console.log("Page loaded.");
    });

    const submitSucceed = () => {
        getTokenPlat({
            username: username,
            password: pwdEncrypt(password)
        }).then((res: any) => {
            if (res.data) dispatch({ type: "GET_USER_INFO_PLAT", data: res.data });
        });
    };

    return (
        <View className="login">
            {/* 标题栏 */}
            <CNavBar title="登录" back={<></>} fixed placeholder />
            <Form labelPosition="right" onFinish={() => submitSucceed()} footer={<Button formType="submit">登录</Button>}>
                <Form.Item required label="账号" name="username" rules={[{ required: true, message: "请输入账号" }]}>
                    <Input value={username} onChange={(val: string) => setUsername(val)} placeholder="请输入账号" type="text" />
                </Form.Item>
                <Form.Item required label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
                    <Input value={password} onChange={(val: string) => setPassword(val)} placeholder="请输入密码" type="text" />
                </Form.Item>
            </Form>
        </View>
    );
}
