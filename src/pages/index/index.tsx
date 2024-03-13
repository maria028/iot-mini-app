/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 14:25:58
 * @Description:充值首页
 */
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Image, Ellipsis, Skeleton, Button } from "@nutui/nutui-react-taro";
import CNavBar from "@/components/CNavBar";
import CIndexBanner from "@/components/CIndexBanner";
import CTabbar from "@/components/CTabbar";
import CLoginButton from "@/components/CLoginButton";
import { getAppUserAccount } from "@/services/account";
import { useDispatch } from "react-redux";
import { AccountItemType } from "@/constants/account";

import "./index.scss";

export default function Index() {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [accountList, setAccountList] = useState([]);
    useEffect(() => {
        setIsLogin(Taro.getStorageSync("isLogin"));
        // 监听登录状态
        const handleLoginStatusChange = (newLoginStatus: any) => {
            setIsLogin(newLoginStatus);
        };
        Taro.eventCenter.on("loginStatusChanged", handleLoginStatusChange);
        return () => {
            Taro.eventCenter.off("loginStatusChanged", handleLoginStatusChange);
        };
    }, []);
    useEffect(() => {
        // 登录状态更新
        getAccountNumberList();
    }, [isLogin]);
    useLoad(() => {
        console.log("Page Index loaded.");
        getAccountNumberList();
    });
    //获取关联的户号列表
    const getAccountNumberList = () => {
        if (!isLogin) return;
        setPageLoading(true);
        getAppUserAccount()
            .then((res: any) => {
                if (res.data) {
                    dispatch({ type: "SAVE_ACCOUNT_LIST", data: res.data });
                    setAccountList(res.data);
                }
            })
            .catch(() => {
                setAccountList([]);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };
    // 跳转新增户号
    const goAccountDetail = () => {
        // Taro.navigateTo({
        //     url: "/packageCharge/pages/account/accountDetail"
        // });
    };
    //跳转充值页面
    const goCharge = (item: AccountItemType) => {
        console.log(item);
        // Taro.navigateTo({
        //   url: `/packageCharge/pages/charge/charge?accountNumber=${item.accountNumber}`,
        // });
    };

    return (
        <View className="index">
            {/* 标题栏 */}
            <CNavBar back={<View className="navbar-title">首页</View>} style={{ backgroundColor: "#00000000" }} fixed />
            {/* 顶部背景图 */}
            <CIndexBanner title={"物联网充值小程序"} />
            {isLogin ? (
                <>
                    {pageLoading ? (
                        <>
                            {/* 骨架屏 */}
                            <View className="account-list">
                                <Skeleton rows={10} title animated />
                            </View>
                        </>
                    ) : (
                        <>
                            {/* 户号信息列表 */}
                            <View className="account-list">
                                {(accountList || []).map((item: AccountItemType) => (
                                    <View className="account-card" onClick={() => goCharge(item)}>
                                        <Image
                                            className="bg-image"
                                            src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/account.png"></Image>
                                        <View className="bg-image-text">WATER BILL</View>
                                        <View className="account-card-content">
                                            <View className="description">{item.description || item.userName}</View>
                                            <View className="small-title">账号余额</View>
                                            <View className="" style="display: flex; align-items: center">
                                                <View className="balance">{(Number(item.balance) / 100).toFixed(2)}</View>
                                                {item.balance < 0 && <View className="tag">已欠费</View>}
                                            </View>
                                            <View style={{ marginTop: "10px" }}>
                                                <Text className="value label">账户号：</Text>
                                                <Text className="value">
                                                    {item.userName} / {item.accountNumber}
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: "10px", display: "flex" }}>
                                                <Text className="value label">地址：</Text>
                                                <View className="value">
                                                    <Ellipsis content={item.accountAddress} direction="middle" />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                {accountList.length == 0 && (
                                    <Image
                                        src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/empty.png"
                                        width={"100%"}
                                        mode={"widthFix"}></Image>
                                )}
                            </View>
                            {/* 新增账户 */}
                            <Button
                                className="account-add"
                                type="primary"
                                block
                                icon={
                                    <View style={{ marginRight: "10px" }}>
                                        <Image src={require("@/assets/images/add.png")} width={20} height={20}></Image>
                                    </View>
                                }
                                onClick={goAccountDetail}>
                                新增账户
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <View className="account-list">
                    <Image
                        src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/empty.png"
                        width={"100%"}
                        mode={"widthFix"}></Image>
                    <View style={{ marginTop: "30px", width: "100%" }}>
                        <CLoginButton type={"button"}></CLoginButton>
                    </View>
                </View>
            )}

            {/* Tabbar */}
            <CTabbar value={0} />
        </View>
    );
}
