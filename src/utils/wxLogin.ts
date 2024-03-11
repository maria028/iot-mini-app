/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-07 17:27:10
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-11 10:41:33
 * @Description:
 */
import Taro from "@tarojs/taro";
import storage from "@/utils/storage";
import { store } from "@/store";
import { wxLogin, getWXuserInfo, getUserInfoPlat } from "@/services/user";

export const checkSession = (callback?: any) => {
    if (Taro.getStorageSync("TOKEN")) {
        // 存在TOKEN
        Taro.checkSession({
            //session_key 未过期，并且在本生命周期一直有效
            success() {
                console.log("session_key 未过期，并且在本生命周期一直有效");
                loginSilentCallback(callback);
            },
            // session_key 已经失效，需要重新执行登录流程  重新登录
            fail() {
                console.log("session_key 已经失效，需要重新执行登录流程");
                Taro.removeStorageSync("TOKEN");
                loginSilent(callback);
            }
        });
    } else {
        // 不存在TOKEN 直接登录
        console.log("不存在TOKEN 直接登录");
        loginSilent(callback);
    }
};

//wx静默登录
//接口返回错误码时 小程序token过期  重新静默登录
export const loginSilent = (callback?: any) => {
    // uni.login获取登录凭证（code）。通过凭证进而换取用户登录态信息、openid等
    Taro.login({
        success(res) {
            if (res.code) {
                //发起网络请求
                // console.log("login返回的code", res.code);
                wxLogin(res.code)
                    .then((resp: any) => {
                        if (resp.status) {
                            // console.log("wxLogin", resp);
                            Taro.setStorageSync("TOKEN", resp.data);
                            // 成功获取token的后续操作
                            loginSilentCallback(callback);
                        } else {
                            Taro.showToast({
                                title: "登录失败",
                                icon: "none"
                            });
                        }
                    })
                    .catch(() => {
                        Taro.removeStorageSync("TOKEN");
                        console.log("登录失败！" + res.errMsg);
                    });
            } else {
                console.log("登录失败");
            }
        },
        fail(err) {
            console.log("登录失败:" + JSON.stringify(err));
            Taro.showToast({
                title: `登录失败:${err}`,
                icon: "none"
            });
        }
    });
};

export const loginSilentCallback = (callback?: any) => {
    // 获取用户信息-微信
    getWXuserInfo()
        .then((data: any) => {
            // 是否为管理员
            getUserInfoPlat(data.data.mobile)
                .then((e: any) => {
                    console.log(e);
                    if (e.data) {
                        storage.setItem("isAdmin", true);
                        //平台用户信息保存 此时没有token
                        store.dispatch({ type: "SAVE_USER_INFO_PLAT", data: e.data });
                    } else {
                        // 存储登录状态  有手机号则认为已登陆
                        storage.setItem("isLogin", data.data.mobile ? true : false);
                    }
                    //解开启动页的进程
                    console.log("解开启动页的进程");
                    Taro.eventCenter.trigger("isResolve");
                })
                .catch((err: any) => {
                    console.log(err);
                });
        })
        .catch((err: any) => {
            console.log(err);
        });
    // 其他 回调；例如onLaunch需要获取系统信息
    if (callback) {
        callback();
    }
};
