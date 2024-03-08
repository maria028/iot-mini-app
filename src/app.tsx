/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 09:52:53
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-08 12:52:11
 * @Description:
 */
import { FC } from "react";
import { Provider } from "react-redux";
import Taro, { useLaunch } from "@tarojs/taro";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { checkSession } from "@/utils/wxLogin";
import { updateWXuserInfo } from "@/services/user";

import "./app.scss";
import "./assets/font/iconfont.css";

const App: FC = ({ children }: any) => {
    useLaunch(async () => {
        console.log("App onLaunch");
        try {
            console.log("Promise");
            let timeoutDurationPromise = new Promise((_, reject) => setTimeout(() => reject(), 30 * 1000)); // 设置超时时长
            let isResolvePromise = new Promise<void>((resolve) => {
                // 确保事件监听器在触发事件之前绑定
                Taro.eventCenter.on("isResolve", () => {
                    resolve();
                });
            });

            // 检查token  静默登录
            checkSession(() => {
                getSystemInfo(); //登录成功后获取系统信息
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

        loadFontFaceFromWeb();
        getUpdateManager(); // 手动触发更新
    });

    // 解锁进程之后执行
    const startApp = () => {
        if (Taro.getStorageSync("isAdmin") && !Taro.getStorageSync("isLogin")) {
            //管理员 未登录/token超时  跳转登录页面
            Taro.reLaunch({ url: `/pages/login/login` });
        } else {
            Taro.reLaunch({
                url: `/pages/index/index`
            });
        }
    };

    // 从网络加载字体
    const loadFontFaceFromWeb = () => {
        // 字体文件返回的 contet-type 参考 font，格式不正确时会解析失败。
        // 字体链接必须是https（ios不支持http)
        // 字体链接必须是同源下的，或开启了cors支持，小程序的域名是servicewechat.com
        // 工具里提示 Faild to load font可以忽略
        // '2.10.0' 以前仅在调用页面生效。

        // 微信小程序端只支持网络字体，字体链接必须是https。App支持网络或本地的字体
        Taro.loadFontFace({
            family: "DingTalk-JinBuTi",
            source: `url("https://iot.hzwaterit.com/fonts/DingTalk-JinBuTi.ttf")`,
            global: true, //一次加载，全局使用
            success() {
                console.log("字体加载成功");
            },
            fail: (err) => {
                console.log("字体加载失败", err);
            }
        });
    };
    //获取系统信息
    const getSystemInfo = () => {
        Taro.getSystemInfo({
            success: (res: any) => {
                let systemInfo = {
                    deviceModel: res.deviceModel, //设备型号
                    osName: res.osName, //系统名称	ios、android、windows、mac
                    osVersion: res.osVersion, //操作系统版本
                    deviceBrand: res.deviceBrand, //设备品牌。如：apple、huawei、honor、oppo
                    hostName: res.hostName, //小程序宿主或uniMPSDK的集成宿主名称，如：WeChat、FeiShu
                    hostVersion: res.hostVersion, //宿主版本。如：微信版本号
                    versionInfo: {}
                };
                if (process.env.TARO_ENV === "weapp") {
                    // 小程序帐号信息
                    systemInfo.versionInfo = Taro.getAccountInfoSync();
                }
                //更新用户的系统信息
                updateWXuserInfo({ userData: JSON.stringify(systemInfo) });
            },
            fail: (err) => {
                console.log(err);
            }
        });
    };
    // 手动触发更新
    const getUpdateManager = () => {
        const updateManager = Taro.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 检测到新版本
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    Taro.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                updateManager.applyUpdate();
                            }
                        }
                    });
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    Taro.showModal({
                        title: "已经有新版本",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开",
                        showCancel: false,
                        confirmText: "我知道了"
                    });
                });
            }
        });
    };

    return (
        <Provider store={store}>
            <PersistGate loading={children} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default App;
