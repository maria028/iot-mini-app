/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-07 16:57:09
 * @Description:
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Image, Ellipsis } from "@nutui/nutui-react-taro";
import CNavBar from "@/components/CNavBar";
import CIndexBanner from "@/components/CIndexBanner";
import CTabbar from "@/components/CTabbar";

import "./index.scss";

export default function Index() {
    useLoad(() => {
        console.log("Page loaded.");
    });

    // 户信息列表-卡片
    const AccountCard = (account: any) => {
        return (
            <View className="account-card">
                <Image className="bg-image" src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/account.png"></Image>
                <View className="bg-image-text">WATER BILL</View>
                <View className="account-card-content">
                    <View className="description">XXX</View>
                    <View className="small-title">账号余额</View>
                    <View className="" style="display: flex; align-items: center">
                        <View className="balance">XXX</View>
                        {true && <View className="tag">已欠费</View>}
                    </View>
                    <View style={{ marginTop: "10px" }}>
                        <Text className="value label">账户号：</Text>
                        <Text className="value">XXX</Text>
                    </View>
                    <View style={{ marginTop: "10px", display: "flex" }}>
                        <Text className="value label">地址：</Text>
                        <Text className="value">
                            <Ellipsis content={"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"} direction="middle" />
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View className="index">
            {/* 标题栏 */}
            <CNavBar back={<View className="navbar-title">首页</View>} style={{ backgroundColor: "#00000000" }} fixed />
            {/* 顶部背景图 */}
            <CIndexBanner title={"物联网充值小程序"} />
            {/* 户号信息列表 */}
            <View className="account-list">
                <AccountCard account={"1"} />
            </View>
            {/* Tabbar */}
            <CTabbar value={0} />
        </View>
    );
}
