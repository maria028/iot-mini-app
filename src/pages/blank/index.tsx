/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-07 18:00:44
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-08 11:24:42
 * @Description:启动页
 */
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Loading, ConfigProvider, Image } from "@nutui/nutui-react-taro";
import logoPng from "@/assets/images/logo.png";
import "./index.scss";

export default function Blank() {
    useLoad(async () => {
        console.log("Page Blank loaded.");
    });

    return (
        <View className="blank">
            <Image src={logoPng} mode={"widthFix"} width={120} height={120}></Image>
            <ConfigProvider theme={{ nutuiLoadingIconSize: "30px" }}>
                <Loading direction="vertical" type="spinner">
                    加载中
                </Loading>
            </ConfigProvider>
        </View>
    );
}
