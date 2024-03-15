/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-04 17:31:59
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-14 14:58:03
 * @Description:
 */
export default defineAppConfig({
    pages: ["pages/blank/index", "pages/index/index", "pages/profile/index", "pages/order/index", "pages/login/index", "pages/test/index"],
    // 分包
    subpackages: [
        {
            root: "packageCharge",
            pages: ["pages/accountDetail/index", "pages/accountList/index"]
        }
    ],
    // 分包预下载
    preloadRule: {
        "pages/index/index": {
            network: "all",
            packages: ["packageCharge"]
        }
    },
    tabBar: {
        backgroundColor: "#ffffff",
        color: "#7d7e80",
        selectedColor: "#1989fa",
        custom: true, //自定义 tabBar;自定义时才支持动态切换tabbar
        // 最多支持5个tab
        list: [
            {
                pagePath: "pages/index/index",
                text: "首页"
            },
            {
                pagePath: "pages/order/index",
                text: "账单查询"
            },
            {
                pagePath: "pages/profile/index",
                text: "我的"
            }
        ]
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "易用水",
        navigationBarTextStyle: "black",
        navigationStyle: "custom"
    }
});
