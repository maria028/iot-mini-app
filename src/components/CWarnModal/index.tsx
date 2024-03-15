/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-15 17:17:43
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-15 17:45:13
 * @Description:
 */
import { Image } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";
import { FC, memo } from "react";
import "./index.scss";

type Props = {
    visible: boolean;
    close: () => void;
    comfirm: () => void;
};
const CWarnModal: FC<Props> = ({ visible, close, comfirm }) => {
    return (
        <>
            {visible && (
                <View className="mask">
                    <View className="container">
                        <Image
                            className="container-bg"
                            src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/modal.png"
                            width={300}
                            mode={"widthFix"}></Image>
                        <View className="container-content">
                            <View className="title">确认删除户号</View>
                            <View className="tips">
                                删除户号后，与该户号相关的数据将一并删除，<Text style={{ color: "#1a90ff" }}>无法恢复</Text>
                            </View>
                        </View>
                        <View className="container-footer">
                            <View className="item" onClick={close}>
                                取消
                            </View>
                            <View className="item confirm" onClick={comfirm}>
                                确认删除
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};

export default memo(CWarnModal);
