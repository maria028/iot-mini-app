/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-27 14:39:32
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:54:30
 * @Description:首页
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { getTokenPlat } from "@/services/user";

import "./index.scss";

export default function Login() {
    useLoad(() => {
        console.log("Page loaded.");
        getTokenPlat({
            username: "panzhenying",
            password: "hdC+nL+PtiT8YLIcx1h/8A=="
        }).then((res: any) => {
            console.log(res);
        });
    });

    return (
        <View className="login">
            <Text>Hello world!</Text>
        </View>
    );
}
