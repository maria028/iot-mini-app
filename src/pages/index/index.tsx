/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-29 16:02:02
 * @Description:
 */
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Image } from "@nutui/nutui-react-taro";
import CTabbar from "@/components/CTabbar";
import CNavBar from "@/components/CNavBar";

import "./index.scss";

export default function Index() {
    useLoad(() => {
        console.log("Page loaded.");
    });

    return (
        <View className="index">
            <CNavBar back={<View className="navbar-title">首页</View>} style={{ backgroundColor: "#00000000" }} fixed />
            <View>
                <Image src={require("@/assets/images/index-bg.png")} mode={"widthFix"} height={200} />
            </View>
            <CTabbar value={0} />
        </View>
    );
}
