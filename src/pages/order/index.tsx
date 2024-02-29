/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:10:22
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-28 17:10:44
 * @Description:账单查询
 */
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import CTabbar from "@/components/CTabbar";

import "./index.scss";

export default function Order() {
    useLoad(() => {
        console.log("Page loaded.");
    });

    return (
        <View className="order">
            <CTabbar value={1} />
        </View>
    );
}
