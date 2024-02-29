/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-27 14:39:32
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-28 17:11:54
 * @Description:首页
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Login() {
    useLoad(() => {
        console.log("Page loaded.");
    });

    return (
        <View className="login">
            <Text>Hello world!</Text>
        </View>
    );
}
