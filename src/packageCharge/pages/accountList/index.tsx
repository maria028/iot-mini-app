import { View, Text } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import "./index.scss";
import CNavBar from "@/components/CNavBar";
import { Button, Image } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { getAppUserAccount, unbindUserAccount } from "@/services/account";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AccountItemType } from "@/constants/account";
import CWarnModal from "@/components/CWarnModal";

export default function accountList() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [accountList, setAccountList] = useState([]);
    const [unbindModalShow, setUnbindModalShow] = useState(false);
    const [unbindItem, setUnbindItem] = useState<AccountItemType>({});

    useDidShow(() => {
        console.log("Page accountList loaded.");
        getAccountNumberList();
    });

    //获取关联的户号列表
    const getAccountNumberList = async () => {
        setLoading(true);
        Taro.showLoading();
        try {
            const res: any = await getAppUserAccount();
            dispatch({ type: "SAVE_ACCOUNT_LIST", data: res.data });
            setAccountList(res.data);
        } catch (err) {
            setAccountList([]);
        }
        Taro.hideLoading();
        setLoading(false);
    };

    // 跳转新增户号
    const goAccountDetail = () => {
        Taro.navigateTo({
            url: "/packageCharge/pages/accountDetail/index"
        });
    };
    // 编辑  跳转
    const editHandle = (item: AccountItemType) => {
        Taro.navigateTo({
            url: `/packageCharge/pages/accountDetail/index?accountNumber=${item.accountNumber}&description=${item.description}`
        });
    };

    // 删除  显示弹框
    const unbindHandle = (item: AccountItemType) => {
        setUnbindModalShow(true);
        setUnbindItem(item);
    };
    // 解绑
    const unbind = () => {
        unbindUserAccount({
            accountUserId: unbindItem.accountUserId || "",
            accountNumber: unbindItem.accountNumber || ""
        })
            .then(() => {
                Taro.showToast({
                    title: "解绑成功！",
                    icon: "success"
                });
                getAccountNumberList();
            })
            .finally(() => {
                setUnbindModalShow(false);
            });
    };

    return (
        <View className="account-list">
            {/* 标题栏 */}
            <CNavBar title="户号管理" placeholder fixed />
            {accountList.map((item: AccountItemType) => {
                return (
                    <View className="account-item">
                        <View className="account-item-head">
                            <Image
                                className="account-item-head-bg"
                                src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/accountItem.png"
                                width={239}></Image>
                            <View className="label-icon">{item.description || item.userName}</View>
                            <View style={{ display: "flex" }}>
                                {/* 编辑*/}
                                <View
                                    onClick={() => {
                                        editHandle(item);
                                    }}>
                                    <Image src={require("@/assets/images/edit.png")} width={16} height={16}></Image>
                                </View>
                                {/* 删除 */}
                                <View
                                    style={{ marginLeft: "20px" }}
                                    onClick={() => {
                                        unbindHandle(item);
                                    }}>
                                    <Image src={require("@/assets/images/delete.png")} width={16} height={16}></Image>
                                </View>
                            </View>
                        </View>
                        <View className="account-item-content">
                            <View className="account-item-content-line">
                                <Text className="label">户 主：</Text>
                                <Text className="value">{item.userName}</Text>
                            </View>
                            <View className="account-item-content-line">
                                <Text className="label">户 号：</Text>
                                <Text className="value">{item.accountNumber}</Text>
                            </View>
                            <View
                                className="account-item-content-line"
                                style={{ display: "flex", alignItems: "flex-start" }}>
                                <Text className="label">地 址：</Text>
                                <Text className="value">{item.accountAddress}</Text>
                            </View>
                        </View>
                    </View>
                );
            })}

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
            {/* 提示框 */}
            <CWarnModal
                visible={unbindModalShow}
                close={() => {
                    setUnbindModalShow(false);
                }}
                comfirm={() => {
                    unbind();
                }}></CWarnModal>
        </View>
    );
}
