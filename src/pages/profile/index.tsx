/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 16:40:41
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 16:57:36
 * @Description:我的
 */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import CTabbar from "@/components/CTabbar";
import CLoginButton from "@/components/CLoginButton";
import { View } from "@tarojs/components";
import { Image, Button } from "@nutui/nutui-react-taro";
import { formatPhone } from "@/utils/format";
import { imageUpload } from "@/services/upload";
import { updateWXuserInfo, getWXuserInfo } from "@/services/user";
import avatarUrlDefault from "@/assets/images/avatar.png";
import { MODE_TYPE } from "@/constants/common";
import { API_ROOT_DEV, API_ROOT_PROD } from "@/config";
import "./index.scss";

export default function Profile() {
    const dispatch = useDispatch();
    const mode = Taro.getStorageSync("mode") || "";
    const isAdmin = Taro.getStorageSync("isAdmin") || false;
    const [isLogin, setIsLogin] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(avatarUrlDefault);
    const [mobile, setMobile] = useState("");
    const versionInfo = Taro.getAccountInfoSync();

    const userInfo = useSelector((state: any) => state.user.userInfo);
    const accountList = useSelector((state: any) => state.account.accountList);

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
        setMobile(userInfo.mobile);
        if (userInfo?.avatar_url) {
            setAvatarUrl(`${process.env.NODE_ENV === "development" ? API_ROOT_DEV : API_ROOT_PROD}${userInfo.avatar_url}`);
        }
    }, [userInfo]);

    useLoad(() => {
        console.log("Page Profile loaded.");
    });
    // 点击获取头像
    const onChooseAvatar = (e: any) => {
        // e.detail.avatarUrl 获取到的是临时路径，需要上传服务器进行保存
        imageUpload(e.detail.avatarUrl)
            .then((res: any) => {
                if (res.data) {
                    //更新用户信息
                    updateWXuserInfo({ avatarUrl: res.data })
                        .then(() => {
                            Taro.showToast({
                                title: "修改成功",
                                icon: "success"
                            });
                            getWXuserInfo().then((data: any) => {
                                dispatch({ type: "SAVE_USER_INFO", data: data.data });
                            });
                        })
                        .catch((err: any) => {
                            console.error(err);
                            this.$message("头像修改失败");
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                this.$message("头像上传失败");
            });
    };

    return (
        <View className="profile">
            {/* top 背景 */}
            <Image src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/profileBg.png" width={"100%"} mode={"widthFix"}></Image>
            {/* 头像昵称 */}
            <View className="profile-brief">
                <View style={{ marginRight: "40px" }}>
                    <Button
                        openType="chooseAvatar"
                        onChooseAvatar={onChooseAvatar}
                        style={{
                            padding: "0",
                            backgroundColor: "transparent",
                            width: "auto",
                            height: "auto"
                        }}>
                        <Image src={avatarUrl} width={80} height={80} radius="50%"></Image>
                    </Button>
                </View>
                {isLogin ? (
                    <>{mobile && <View style={{ marginTop: "20px" }}>{formatPhone(mobile)}</View>}</>
                ) : (
                    <View style={{ marginTop: "20px" }}>
                        <CLoginButton type="text"></CLoginButton>
                    </View>
                )}
            </View>
            {/* 户号管理 */}
            {mode != MODE_TYPE.DEV && (
                <View className="profile-menu">
                    <View style={{ display: "flex", alignItems: "center" }}>
                        <View style={{ marginRight: "35px" }}>
                            <Image src={require("@/assets/images/accountList.png")} width={44} height={44}></Image>
                        </View>
                        <View>
                            <View className="profile-menu-name">户号管理</View>
                            {accountList.length > 0 && <View className="profile-menu-tips">当前户号：{accountList.length}</View>}
                        </View>
                    </View>
                    <Image src={require("@/assets/images/arrowRight.png")} width={24} height={24}></Image>
                </View>
            )}
            {/* 水费充值 */}
            {mode == MODE_TYPE.DEV && isAdmin && (
                <View className="profile-menu">
                    <View style={{ display: "flex", alignItems: "center" }}>
                        <View style={{ marginRight: "35px" }}>
                            <Image src={require("@/assets/images/accountList.png")} width={44} height={44}></Image>
                        </View>
                        <View>
                            <View className="profile-menu-name">水费充值</View>
                        </View>
                    </View>
                    <Image src={require("@/assets/images/arrowRight.png")} width={24} height={24}></Image>
                </View>
            )}
            {/* 设备运维 */}
            {mode != MODE_TYPE.DEV && isAdmin && (
                <View className="profile-menu">
                    <View style={{ display: "flex", alignItems: "center" }}>
                        <View style={{ marginRight: "35px" }}>
                            <Image src={require("@/assets/images/accountList.png")} width={44} height={44}></Image>
                        </View>
                        <View>
                            <View className="profile-menu-name">设备运维</View>
                        </View>
                    </View>
                    <Image src={require("@/assets/images/arrowRight.png")} width={24} height={24}></Image>
                </View>
            )}
            {/* 版本信息 */}
            {versionInfo && (
                <View className="version">
                    {versionInfo.miniProgram.envVersion}
                    {versionInfo.miniProgram.version}
                </View>
            )}
            {/* Tabbar */}
            <CTabbar value={2} />
        </View>
    );
}
