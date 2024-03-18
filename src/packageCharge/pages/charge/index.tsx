/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 08:49:25
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 15:26:09
 * @Description:
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import CNavBar from "@/components/CNavBar";
import { Image, Input, Button, Ellipsis, Grid } from "@nutui/nutui-react-taro";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import { getAccountNumberDetail } from "@/services/account";
import { useState } from "react";
import { AccountItemType } from "@/constants/account";
import { checkAmount } from "@/utils/validate";
import { formatAmountFenToYuan } from "@/utils/format";
import Taro from "@tarojs/taro";
import { createOrder } from "@/services/charge";

export default function Charge() {
    const { navbarHeight } = useCustomNavBarParams();
    const [accountNumber, setAccountNumber] = useState(""); // 户号
    const [accountDetail, setAccountDetail] = useState<AccountItemType>({}); // 户的详细信息
    const quickAmount = ["20", "50", "100", "150", "200", "300"]; //快捷充值金额
    const [chargeAmount, setChargeAmount] = useState(""); // 输入金额
    const [chargeAmountQuick, setChargeAmountQuick] = useState(""); // 快捷金额

    useLoad((options) => {
        console.log("Page Charge loaded.");
        setAccountNumber(options.accountNumber);
        getAccountDetail(options.accountNumber);
    });

    //获取该户号的详细信息
    const getAccountDetail = (accountNumber: string) => {
        setAccountDetail({});
        getAccountNumberDetail(accountNumber).then((res: any) => {
            if (res.data) {
                setAccountDetail(res.data);
            }
        });
    };
    // 提交充值
    const submitHandle = () => {
        if (!chargeAmount && chargeAmountQuick) {
            Taro.showToast({
                title: "请选择或填写充值金额",
                icon: "none"
            });
            return;
        }
        Taro.showLoading({ mask: true, title: "" });

        const amount = chargeAmount || chargeAmountQuick;
        const params = {
            amount: parseInt((Number(amount) * 100).toString()), //元转化为分
            description: `充值水费${amount}元`, //说明文案，在支付通知中展示
            orderType: "wechat-applet", //自定义支付类型  微信小程序wechat-applet
            accountNumber: accountNumber
        };
        // 创建平台订单，获取支付签名等信息
        createOrder(params)
            .then((res: any) => {
                if (res.data) {
                    let data = res.data;
                    let tradeNo = data.tradeNo;
                    // 调用支付API
                    Taro.requestPayment({
                        timeStamp: data.timeStamp.toString(),
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: "MD5",
                        paySign: data.paySign,
                        success: (res) => {
                            console.log("success:" + JSON.stringify(res));
                            Taro.redirectTo({
                                url: `/packageCharge/pages/chargeResult/index?tId=${tradeNo}`
                            });
                            Taro.hideLoading();
                        },
                        fail: (err) => {
                            console.log("fail:" + JSON.stringify(err));
                            Taro.showToast({
                                title: "取消支付",
                                icon: "none"
                            });
                        }
                    });
                } else {
                    Taro.showToast({
                        title: "支付失败",
                        icon: "none"
                    });
                }
            })
            .catch((err) => {
                console.log("fail:" + JSON.stringify(err));
                uni.hideLoading();
            });
    };

    return (
        <View className="charge">
            {/* 标题栏 */}
            <CNavBar title="水费充值" style={{ backgroundColor: "#00000000" }} color="#ffffff" fixed />
            {/* top 背景 */}
            <View className="charge-top">
                <View className="charge-top-content" style={{ paddingTop: navbarHeight }}>
                    <View className="charge-top-content-title">杭州市水务集团有限公司</View>
                    <View className="charge-top-content-titlesub">收费单位名称</View>
                </View>
                <Image
                    className="charge-top-bg"
                    src={"https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/charge.png"}
                    mode={"widthFix"}
                    width={"100%"}
                    height={150}
                />
            </View>
            {/* 基本信息 */}
            <View className="charge-info">
                <Image
                    className="charge-info-bg"
                    src={"https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/accountDetail.png"}
                    width={"100%"}
                    height={"100%"}
                />
                <View className="charge-info-content">
                    <View className="charge-info-content-label">账号余额</View>
                    <View className="" style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                        <View className="balance">{(Number(accountDetail.balance) / 100).toFixed(2)}</View>
                        {accountDetail.balance && accountDetail.balance < 0 && <View className="tag">已欠费</View>}
                    </View>
                    <View style={{ marginTop: "18px" }}>
                        <Text className="charge-info-content-label">户 号：</Text>
                        <Text className="charge-info-content-value">{accountDetail.userName}</Text>
                    </View>
                    <View style={{ marginTop: "11px" }}>
                        <Text className="charge-info-content-label">户 主：</Text>
                        <Text className="charge-info-content-value">{accountDetail.accountNumber}</Text>
                    </View>
                    <View style={{ marginTop: "11px", display: "flex" }}>
                        <View className="charge-info-content-label">地 址：</View>
                        <View className="charge-info-content-value">
                            <Ellipsis content={accountDetail.accountAddress} direction="start" />
                        </View>
                    </View>
                </View>
            </View>
            {/* 充值 */}
            <View className="charge-block">
                {/* 账户充值 */}
                <View style={{ display: "flex", alignItems: "center" }}>
                    <View style={{ marginRight: "8px" }}>
                        <Image src={require("@/assets/images/charge.png")} width={16} height={16} />
                    </View>
                    <View className="title">账户充值</View>
                </View>
                {/* 快捷金额 */}
                <View className="charge-block-quick">
                    {quickAmount.map((item) => {
                        return (
                            <View
                                className={`charge-block-quick-item ${chargeAmountQuick == item ? "active" : ""}`}
                                onClick={() => {
                                    setChargeAmountQuick(item);
                                    setChargeAmount("");
                                }}>
                                <Text className="text">{item}</Text>
                                <Text className="unit">元</Text>
                            </View>
                        );
                    })}
                </View>
                {/* 自定义充值 */}
                <View style={{ display: "flex", alignItems: "center" }}>
                    <View style={{ marginRight: "8px" }}>
                        <Image src={require("@/assets/images/amount.png")} width={16} height={16} />
                    </View>
                    <View className="title">自定义充值</View>
                </View>
                {/* 输入框 */}
                <View className="charge-block-input">
                    <View className="input">
                        <Input
                            value={chargeAmount}
                            type="digit"
                            placeholder="点击输入充值金额"
                            clearable
                            onFocus={() => {
                                setChargeAmountQuick("");
                            }}
                            onChange={(value: string) => {
                                setChargeAmount(checkAmount(value));
                            }}
                        />
                    </View>
                    <View className="unit">元</View>
                </View>
                {/* 欠费 自动填入 */}
                {accountDetail.balance && accountDetail.balance < 0 && (
                    <>
                        <View className="charge-block-auto">
                            <View>
                                当前欠费金额
                                <Text style={{ color: "#1a90ff", padding: "0 4px", fontWeight: "500" }}>
                                    {formatAmountFenToYuan(Math.abs(accountDetail.balance))}
                                </Text>
                                元
                            </View>
                            <View
                                style={{ color: "#1a90ff" }}
                                onClick={() => {
                                    setChargeAmountQuick("");
                                    setChargeAmount(
                                        formatAmountFenToYuan(Math.abs(accountDetail.balance || 0)).toString()
                                    );
                                }}>
                                自动填入
                            </View>
                        </View>
                    </>
                )}
            </View>
            {/* 按钮 */}
            <View className="screen-padding">
                <Button type="primary" size="large" block style={{ marginTop: "24px" }} onClick={submitHandle}>
                    充值
                </Button>
            </View>
        </View>
    );
}
