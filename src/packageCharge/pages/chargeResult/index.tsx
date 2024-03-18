/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 15:28:23
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 15:29:01
 * @Description:
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function ChargeResult() {
    useLoad(() => {
        console.log("Page chargeResult loaded.");
    });

    return (
        <View className="chargeResult">
            <Text>Hello world!</Text>
        </View>
    );
}
