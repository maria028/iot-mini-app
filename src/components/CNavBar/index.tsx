/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:37:15
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-29 17:14:28
 * @Description:
 */
import { FC, memo, CSSProperties, ReactNode } from "react";
import { View } from "@tarojs/components";
import { NavBar } from "@nutui/nutui-react-taro";
import { ArrowLeft } from "@nutui/icons-react-taro";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import "./index.scss";

type Props = {
    title?: string | ReactNode;
    back?: ReactNode;
    fixed?: boolean;
    placeholder?: boolean;
    style?: string | CSSProperties;
};

const CNavBar: FC<Props> = ({ title, back, fixed, placeholder, style = {} }) => {
    const { navigationBarHeight, statusBarHeight } = useCustomNavBarParams();

    return (
        <>
            <View
                style={Object.assign(
                    {
                        height: `${navigationBarHeight}px`,
                        paddingTop: `${statusBarHeight}px`,
                        backgroundColor: "#ffffff"
                    },
                    style
                )}
                className={`c-navbar ${fixed ? "fixed" : ""}`}
            >
                <NavBar back={back ? back : <ArrowLeft size={16} />}>
                    <span>{title}</span>
                </NavBar>
            </View>
            {/* 固定在顶部时，是否在标签位置生成一个等高的占位元素 */}
            {placeholder && (
                <View
                    style={{
                        height: `${height}px`,
                        paddingTop: `${paddingTop}px`
                    }}
                />
            )}
        </>
    );
};

export default memo(CNavBar);
