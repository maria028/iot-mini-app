/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 16:40:41
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-28 17:11:38
 * @Description:我的
 */
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import CTabbar from "@/components/CTabbar";

import "./index.scss";

export default function Profile() {
    useLoad(() => {
        console.log("Page loaded.");
    });

    return (
        <View className="profile">
            <CTabbar value={2} />
        </View>
    );
}
