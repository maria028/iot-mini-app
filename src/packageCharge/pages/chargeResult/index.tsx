/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 15:28:23
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 15:57:26
 * @Description:支付结果
 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Image, Button } from "@nutui/nutui-react-taro";
import "./index.scss";
import CNavBar from "@/components/CNavBar";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { queryPayOrder } from "@/services/charge";
import { ORDER_PAY_RESULT } from "@/constants/charge";

export default function ChargeResult() {
    const [tradeState, setTradeState] = useState("");

    useLoad((options) => {
        console.log("Page chargeResult loaded.");
        queryPayOrder({ tradeNo: options.tId }).then((res: any) => {
            //目前仅展示支付成功
            if (res.data && res.data == "SUCCESS") {
                setTradeState("SUCCESS");
            } else {
                setTradeState(res.data || "");
            }
        });
    });

    const tradeStateDesc = () => {
        let find = ORDER_PAY_RESULT.find((i) => {
            return i.value == tradeState;
        });
        return find ? find.label : "";
    };

    return (
        <View className="charge-result">
            <Image
                className="charge-result-bg"
                src={"https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/chargeResult.png"}
                mode={"widthFix"}
                width={"100%"}
            />
            {/* 标题栏 */}
            <CNavBar title={`支付结果`} style={{ backgroundColor: "#00000000" }} fixed placeholder />

            <View className="charge-result-main">
                {tradeState == "SUCCESS" ? (
                    <>
                        <Image src={require("@/assets/images/success.png")} width={108} height={108} />
                        <View className="charge-result-main-title">{tradeStateDesc()}</View>
                        <View className="charge-result-main-sub-title">恭喜您水费充值成功！</View>
                    </>
                ) : (
                    <>
                        <View className="charge-result-main-title">{tradeStateDesc()}</View>
                    </>
                )}
            </View>

            {/* 返回首页 */}
            <View className="screen-padding">
                <Button
                    size="large"
                    block
                    onClick={() => {
                        Taro.reLaunch({
                            url: "/pages/index/index"
                        });
                    }}>
                    返回首页
                </Button>
            </View>
        </View>
    );
}
