/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:37:15
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-14 15:33:58
 * @Description:
 */
import { FC, memo, CSSProperties, ReactNode } from "react";
import { View } from "@tarojs/components";
import { NavBar } from "@nutui/nutui-react-taro";
import { ArrowLeft, Home } from "@nutui/icons-react-taro";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import "./index.scss";
import Taro from "@tarojs/taro";

type Props = {
    title?: string | ReactNode;
    color?: string;
    back?: ReactNode;
    fixed?: boolean;
    placeholder?: boolean;
    style?: string | CSSProperties;
};

const CNavBar: FC<Props> = ({ title, color, back, fixed, placeholder, style = {} }) => {
    const { navigationBarHeight, statusBarHeight } = useCustomNavBarParams();
    const Back = () => {
        if (back) {
            return back;
        } else {
            const pagesLen = Taro.getCurrentPages().length;
            return pagesLen > 1 ? <ArrowLeft size={18} color={color} /> : <Home size={18} color={color} />;
        }
    };
    const backClick = () => {
        if (back) {
            return;
        } else {
            const pagesLen = Taro.getCurrentPages().length;
            pagesLen > 1
                ? Taro.navigateBack()
                : Taro.reLaunch({
                      url: "/pages/index/index"
                  });
        }
    };
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
                className={`c-navbar ${fixed ? "fixed" : ""}`}>
                <NavBar back={<Back></Back>} onBackClick={backClick}>
                    <span style={{ color: color }}>{title}</span>
                </NavBar>
            </View>
            {/* 固定在顶部时，是否在标签位置生成一个等高的占位元素 */}
            {placeholder && (
                <View
                    style={{
                        height: `${navigationBarHeight}px`,
                        paddingTop: `${statusBarHeight}px`
                    }}
                />
            )}
        </>
    );
};

export default memo(CNavBar);
