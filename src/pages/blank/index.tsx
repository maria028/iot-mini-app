/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-07 18:00:44
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-14 15:05:57
 * @Description:启动页
 */
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Loading, ConfigProvider, Image } from "@nutui/nutui-react-taro";
import logoPng from "@/assets/images/logo.png";
import "./index.scss";

export default function Blank() {
    useLoad(async () => {
        console.log("Page Blank loaded.");
        try {
            let timeoutDurationPromise = new Promise((_, reject) => setTimeout(() => reject(), 30 * 1000)); // 设置超时时长
            let isResolvePromise = new Promise<void>((resolve) => {
                // 确保事件监听器在触发事件之前绑定
                Taro.eventCenter.on("isResolve", () => {
                    resolve();
                });
            });

            await Promise.race([isResolvePromise, timeoutDurationPromise]);
            // 解锁进程
            console.log("启动页 解锁");
            Taro.eventCenter.off(); // 取消监听所有事件
            startApp();
        } catch (error) {
            console.log("启动超时");
            Taro.showToast({
                title: "启动超时",
                icon: "none"
            });
        }
    });
    // 解锁进程之后执行
    const startApp = () => {
        if (Taro.getStorageSync("isAdmin") && !Taro.getStorageSync("isLogin")) {
            //管理员 未登录/token超时  跳转登录页面
            Taro.reLaunch({ url: `/pages/login/index` });
        } else {
            Taro.reLaunch({
                url: `/pages/index/index`
            });
        }
    };

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
