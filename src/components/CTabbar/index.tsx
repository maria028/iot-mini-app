import Taro from "@tarojs/taro";
import { Tabbar } from "@nutui/nutui-react-taro";
import { IconFont } from "@nutui/icons-react-taro";
import { Home, HomeFill, Search, SearchFill, Profile, ProfileFill } from "./icon";
import "./index.scss";

export default function CTabbar({ value }) {
    const tabList = ["/pages/index/index", "/pages/order/index", "/pages/profile/index"];
    const switchPage = (index: number) => {
        Taro.switchTab({
            url: tabList[index]
        });
    };
    return (
        <>
            <Tabbar
                inactiveColor="#999999"
                activeColor="#1a90ff"
                fixed
                value={value}
                onSwitch={(value) => {
                    switchPage(value);
                }}
            >
                <Tabbar.Item title="首页" icon={<IconFont size="24" name={value == 0 ? HomeFill : Home} />} />
                <Tabbar.Item title="账单查询" icon={<IconFont size="24" name={value == 1 ? SearchFill : Search} />} />
                <Tabbar.Item title="我的" icon={<IconFont size="24" name={value == 2 ? ProfileFill : Profile} />} />
            </Tabbar>
        </>
    );
}
