/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:37:15
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-19 15:00:49
 * @Description:
 */
import { FC, memo, useState } from "react";
import { View } from "@tarojs/components";
import { Tabs } from "@nutui/nutui-react-taro";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import "./index.scss";

type Props = {
    list: Array<any>;
    onTabChange: (data: any) => void;
};

const CTabs: FC<Props> = ({ list, onTabChange }) => {
    const { navigationBarHeight } = useCustomNavBarParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View className="c-tabs">
            <Tabs
                value={currentIndex}
                tabStyle={{ position: "sticky", top: navigationBarHeight, fontFamily: "DingTalk-JinBuTi" }}
                align="left"
                onClick={(index: number) => {
                    setCurrentIndex(index);
                    onTabChange(list[index]);
                }}>
                {list.map((item: any) => {
                    return <Tabs.TabPane title={item.description}></Tabs.TabPane>;
                })}
            </Tabs>
        </View>
    );
};

export default memo(CTabs);
