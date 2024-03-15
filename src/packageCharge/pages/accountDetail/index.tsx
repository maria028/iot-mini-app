/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-14 14:49:08
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-15 15:57:06
 * @Description:
 */
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import { Image, Input, Button } from "@nutui/nutui-react-taro";
import CNavBar from "@/components/CNavBar";
import { getAccountNumber, bindUserAccount, getAccountNumberDetail, updateDescription } from "@/services/account";
import { AccountItemType } from "@/constants/account";

import "./index.scss";

export default function accountDetail() {
    const { navbarHeight } = useCustomNavBarParams();
    const [pageType, setPageType] = useState("add"); // 新增 add  编辑edit
    const [accountNumber, setAccountNumber] = useState(""); // 户号
    const [description, setDescription] = useState(""); // 备注
    const [accountDetail, setAccountDetail] = useState<AccountItemType>({}); // 户的详细信息

    useLoad((options) => {
        console.log("Page accountDetail loaded.");
        if (options.accountNumber) {
            setAccountNumber(options.accountNumber);
            setAccountNumber(options.accountNumber);
            setDescription(options.description);
            setPageType("edit");
            getAccountDetail(options.accountNumber);
        } else {
            setAccountNumber("");
            setPageType("add");
        }
    });
    //确定户号  获取该户号的详细信息  未绑定
    const confirmHandle = () => {
        setAccountDetail({});
        if (!accountNumber) return;
        getAccountNumber(accountNumber).then((res: any) => {
            if (res.data) {
                setAccountDetail(res.data);
            }
        });
    };

    //获取该户号的详细信息  已绑定
    const getAccountDetail = (accountNum: string) => {
        setAccountDetail({});
        if (!accountNum) return;
        getAccountNumberDetail(accountNum).then((res: any) => {
            if (res.data) {
                setAccountDetail(res.data);
            }
        });
    };
    // 点击确认按钮
    const submitHandle = () => {
        pageType == "add" ? bindHandle() : updateHandle();
    };
    // 绑定操作
    const bindHandle = () => {
        if (!accountNumber) {
            Taro.showToast({
                title: "请填写户号",
                icon: "none"
            });
            return;
        }
        Taro.showLoading({
            title: "绑定中",
            mask: true
        });
        bindUserAccount({
            accountNumber: accountNumber,
            description
        }).then(() => {
            Taro.navigateBack({
                success: () => {
                    setTimeout(() => {
                        Taro.showToast({
                            title: "绑定成功",
                            icon: "success"
                        });
                    }, 1000);
                }
            });
        });
    };
    //提交更新
    const updateHandle = () => {
        updateDescription({
            accountUserId: accountDetail?.accountUserId || "",
            description
        }).then(() => {
            Taro.navigateBack({
                success: () => {
                    setTimeout(() => {
                        Taro.showToast({
                            title: "修改成功！",
                            icon: "success"
                        });
                    }, 1000);
                }
            });
        });
    };

    return (
        <View className="account_detail">
            {/* 标题栏 */}
            <CNavBar
                title={`${pageType == "add" ? "新增账户" : "编辑账户"}`}
                style={{ backgroundColor: "#00000000" }}
                color="#ffffff"
                fixed
            />
            {/* top 背景 */}
            <View className="account_detail-top">
                <View className="account_detail-top-content" style={{ paddingTop: navbarHeight }}>
                    <View className="account_detail-top-content-title">杭州市水务集团有限公司</View>
                    <View className="account_detail-top-content-titlesub">收费单位名称</View>
                </View>
                <Image
                    className="account_detail-top-bg"
                    src={"https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/charge.png"}
                    mode={"widthFix"}
                    width={"100%"}
                    height={150}
                />
            </View>
            {/* 户号 */}
            <View className="account_detail-block">
                <View style={{ display: "flex" }}>
                    <Image src={require("@/assets/images/account.png")} width={15} height={16} />
                    <Text className="account_detail-block-title">户号</Text>
                </View>
                {/* 输入框 */}
                <View className="account_detail-block-input">
                    <Input
                        value={accountNumber}
                        disabled={pageType == "edit"}
                        placeholder="请输入户号"
                        onBlur={confirmHandle}
                        onConfirm={confirmHandle}
                        onKeyboardHeightChange={confirmHandle}
                        onChange={(val) => setAccountNumber(val)}
                    />
                </View>
                {accountDetail.userName && (
                    <>
                        <View style={{ marginTop: "14px" }}>
                            <Text className="account_detail-block-label">户 主：</Text>
                            <Text className="account_detail-block-value">{accountDetail.userName}</Text>
                        </View>
                        <View style={{ marginTop: "14px" }}>
                            <Text className="account_detail-block-label">地 址：</Text>
                            <Text className="account_detail-block-value">{accountDetail.accountAddress}</Text>
                        </View>
                    </>
                )}
            </View>
            {/* 备注 */}
            <View className="account_detail-block">
                <View style={{ display: "flex" }}>
                    <Image src={require("@/assets/images/edit.png")} width={15} height={16} />
                    <Text className="account_detail-block-title">备注</Text>
                </View>
                {/* 输入框 */}
                <View className="account_detail-block-input">
                    <Input value={description} placeholder="请输入备注, 如父母" onChange={(val) => setDescription(val)} />
                </View>
            </View>
            {/* 按钮 */}
            <View className="screen-padding">
                <Button type="primary" size="large" block style={{ marginTop: "80px" }} onClick={submitHandle}>
                    确认
                </Button>
            </View>
        </View>
    );
}
