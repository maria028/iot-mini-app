/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:54:48
 * @Description:
 */
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import CTabbar from "@/components/CTabbar";
import CNavBar from "@/components/CNavBar";
import CIndexBanner from "@/components/CIndexBanner";
import "./index.scss";

export default function Index() {
    useLoad(() => {
        console.log("Page loaded.");
    });
    // 户信息列表-卡片
    const AccountCard = () => {
        return <View className="account-card">123</View>;
    };
    return (
        <View className="index">
            {/* 标题栏 */}
            <CNavBar back={<View className="navbar-title">首页</View>} style={{ backgroundColor: "#00000000" }} fixed />
            {/* 顶部背景图 */}
            <CIndexBanner title={"物联网充值小程序"} />
            {/* 户号信息列表 */}
            {/* <AccountCard /> */}
            <CTabbar value={0} />
        </View>
    );
}
