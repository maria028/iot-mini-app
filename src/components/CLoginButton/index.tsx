/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-13 09:14:14
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 14:15:25
 * @Description:
 */
import Taro from "@tarojs/taro";
import { Button } from "@nutui/nutui-react-taro";
import { getWxPhoneNumber, getUserInfoPlat, getWXuserInfo } from "@/services/user";
import storage from "@/utils/storage";
import { store } from "@/store";

const decryptPhoneNumber = (e: any) => {
    // 同意授权后才能拿到code
    if (e.detail.code) {
        getWxPhoneNumber(e.detail.code).then((res: any) => {
            if (res.data) {
                const phone = res.data;
                // 是否为管理员
                getUserInfoPlat(phone)
                    .then((e: any) => {
                        if (e.data) {
                            //管理员  跳转登录页面
                            Taro.reLaunch({ url: `/pages/login/index` });
                        } else {
                            // 登录成功
                            Taro.showToast({
                                title: "登录成功！",
                                icon: "success"
                            });
                            storage.setItem("isLogin", true);
                            Taro.eventCenter.trigger("loginStatusChanged", true);
                        }
                        //获取用户信息 头像等
                        getWXuserInfo().then((resp: any) => {
                            if (resp.data) {
                                store.dispatch({ type: "SAVE_USER_INFO", data: resp.data });
                            }
                        });
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        });
    }
};

const LoginButton = ({ type }) => {
    if (type == "button") {
        return (
            <Button openType="getPhoneNumber" block onGetPhoneNumber={decryptPhoneNumber}>
                点击登录
            </Button>
        );
    } else if (type == "text") {
        return (
            <Button openType="getPhoneNumber" block>
                点击登录
            </Button>
        );
    }
    return null;
};

export default function CLoginButton({ type }) {
    return (
        <>
            <LoginButton type={type} />
        </>
    );
}
