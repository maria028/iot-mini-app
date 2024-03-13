/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 09:54:49
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 16:32:48
 * @Description:充值首页、运维首页公用一个样式，只需替换图片和文字
 */
import { View } from "@tarojs/components";
import { Image } from "@nutui/nutui-react-taro";
import { IconFont } from "@nutui/icons-react-taro";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";
import { formatDate, formatDateToWeekDay } from "@/utils/date";
import "./index.scss";

export default function CIndexBanner({ title }) {
    const { navbarHeight } = useCustomNavBarParams();
    // 2023.11.01 星期三
    const currentDate = `${formatDate(new Date(), "YYYY.MM.DD")} ${formatDateToWeekDay()}`;

    return (
        <>
            <View className="top-banner">
                <View className="top-banner-content" style={{ paddingTop: `${navbarHeight}px` }}>
                    <View className="top-banner-content-title">{title}</View>
                    <View className="top-banner-content-date">
                        <View className="top-banner-content-date-icon">
                            <IconFont fontClassName="iconfont" classPrefix="icon" name="calendar" size="14px" />
                        </View>
                        <View>{currentDate}</View>
                    </View>
                </View>
                <Image
                    className="top-banner-background"
                    src={require("@/assets/images/indexBg.png")}
                    mode={"widthFix"}
                    width={"100%"}
                    height={navbarHeight}
                />
            </View>
        </>
    );
}
