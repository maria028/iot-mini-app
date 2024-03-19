/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:10:22
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-19 17:31:47
 * @Description:账单查询
 */
import { View, Text } from "@tarojs/components";
import { useLoad, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import "./index.scss";
import CNavBar from "@/components/CNavBar";
import CTabbar from "@/components/CTabbar";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Image, Loading, Picker } from "@nutui/nutui-react-taro";
import CLoginButton from "@/components/CLoginButton";
import CLineChart from "@/components/CLineChart";
import { useSelector } from "react-redux";
import CTabs from "@/components/CTabs";
import dayjs from "dayjs";
import { queryBillDeductionSum, queryBillLogList } from "@/services/charge";
import { formatAmountFenToYuan, formatConstData } from "@/utils/format";
import { ORDER_FILTER_DATE, ORDER_TYPE, ORDER_TYPE_DATE, ORDER_TYPE_ORG, ORDER_TYPE_TEXT } from "@/constants/charge";
import { TriangleDown, TriangleUp } from "@nutui/icons-react-taro";
import { formatDate } from "@/utils/date";
import useCustomNavBarParams from "@/hooks/useCustomNavBarParams";

export default function Order() {
    const { navbarHeight } = useCustomNavBarParams();
    const [isLogin, setIsLogin] = useState(false);
    const accountList = useSelector((state: any) => state.account.accountList);
    const pageSize = 10;
    const [pageNo, setPageNo] = useState(0); // 当前页
    const [loading, setLoading] = useState(false); // 加载状态
    const [hasMore, setHasMore] = useState(true); // 是否加载完毕
    const [list, setList] = useState([]); // 数据列表
    const [monthList, setMonthList] = useState<Array<{ yearMonth: string; list: Array<any> }>>([]); // 划分月份的数据列表  [{yearMonth:xx,list:[]}]
    const [monthTotalList, setMonthTotalList] = useState([]); // 月度水费-图表
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateRangFilterText, setDateRangFilterText] = useState("6个月内");

    const [searchParams, setSearchParams] = useState({
        accountUserId: accountList.length > 0 ? accountList[0].accountUserId : "", //户号id
        billType: "", //订单类型选 全部、充值pay、扣费deduct
        startTime: dayjs().add(-5, "month").format("YYYY-MM-01"), //起始时间
        endTime: dayjs().add(1, "day").format("YYYY-MM-DD") //结束时间 需要加一天；例如当日1-1号，传参1-2才能返回1号数据
    }); //

    // 在状态改变时重新加载查询参数
    useEffect(() => {
        console.log("Query Params Changed: ", searchParams);
        pageInit();
    }, [searchParams]);
    useEffect(() => {
        console.log("pageNo", pageNo);
        // 初始化
        if (pageNo == 1) {
            getOrderList();
            getWaterMonthFee();
        }
    }, [pageNo]);

    useEffect(() => {
        setIsLogin(Taro.getStorageSync("isLogin"));
        // 监听登录状态
        const handleLoginStatusChange = (newLoginStatus: any) => {
            setIsLogin(newLoginStatus);
        };
        Taro.eventCenter.on("loginStatusChanged", handleLoginStatusChange);
        return () => {
            Taro.eventCenter.off("loginStatusChanged", handleLoginStatusChange);
        };
    }, []);
    useEffect(() => {
        // 登录状态更新
        pageInit();
    }, [isLogin]);

    useLoad(() => {
        console.log("Page Order loaded.");
        pageInit();
    });
    usePullDownRefresh(() => {
        pageInit();
    });
    useReachBottom(() => {
        if (!hasMore) return;
        getOrderList();
    });
    //重置页面数据  刷新
    const pageInit = () => {
        if (!isLogin) return;
        setPageNo(1);
        setHasMore(true);
        setList([]);
        setMonthList([]);
        setMonthTotalList([]);
    };

    // 获取流水账单数据
    const getOrderList = async () => {
        setLoading(true);
        const params = {
            pageNo: pageNo,
            pageSize: pageSize,
            ...searchParams
        };
        try {
            const res = await queryBillLogList(params);
            const newList = res.data.list;
            getMonthList(newList);
            setPageNo(pageNo + 1);
            setHasMore(newList.length < params.pageSize ? false : true);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // 获取月度累计水费--显示图表
    const getWaterMonthFee = async () => {
        const params = {
            accountUserId: searchParams.accountUserId,
            startTime: searchParams.startTime,
            endTime: searchParams.endTime
        };
        try {
            const res = await queryBillDeductionSum(params);
            let list = res.data.reverse();
            setMonthTotalList(
                list.map((item: any) => {
                    return {
                        month: dayjs(item.time).format("M"),
                        amount: formatAmountFenToYuan(item.sumDeduction)
                    };
                })
            );
        } catch (error) {
            setMonthTotalList([]);
        }
    };

    // 数据按月份进行分类
    const getMonthList = async (list: Array<any>) => {
        if (list.length == 0) return;
        let result: Array<any> = monthList;
        list.forEach((ele) => {
            let month = dayjs(ele.createDate).format("YYYY年M月");
            let yearMonthIndex = result.findIndex((i: any) => i.yearMonth == month);
            if (yearMonthIndex > -1) {
                // 已存在月份  list中插入数据
                result = result.map((item) => {
                    if (item.yearMonth == month) {
                        // 已存在月份  list中插入数据
                        item.list.push(ele);
                    }
                    return item;
                });
            } else {
                // 未存在月份数据 则新建一条记录
                const newItem = {
                    yearMonth: month,
                    list: [ele]
                };
                result.push(newItem);
            }
        });
        setMonthList(result);
    };

    // 切换时间范围
    const changeRangDate = (list: Array<any>, value: any) => {
        let dateRange = value;
        setDateRangFilterText(list[0].text);
        switch (dateRange) {
            case "6months":
                setSearchParams({ ...searchParams, startTime: dayjs().add(-5, "month").format("YYYY-MM-01") });
                break;
            case "3months":
                setSearchParams({ ...searchParams, startTime: dayjs().add(-2, "month").format("YYYY-MM-01") });
                break;
            default:
                break;
        }
        setSearchParams({ ...searchParams, endTime: dayjs().add(1, "day").format("YYYY-MM-DD") });
    };

    return (
        <View className="order">
            {/* 标题栏 */}
            <CNavBar back={<></>} title="账单查询" style={{ backgroundColor: "#FFFFFF" }} fixed placeholder />
            {isLogin ? (
                <>
                    {/* 多户显示  单户不显示 */}
                    {accountList.length > 0 && (
                        <CTabs
                            list={accountList}
                            onTabChange={(data: any) => {
                                setSearchParams({ ...searchParams, accountUserId: data.accountUserId });
                            }}></CTabs>
                    )}
                    {/* 折线图 */}
                    <View className="order-chart">
                        <CLineChart canvasId="sum-line" list={monthTotalList}></CLineChart>
                    </View>
                    {/* 筛选条件 */}
                    <View className="order-filter">
                        {/* 订单类型 */}
                        <View className="order-filter-type">
                            {ORDER_TYPE.map((item) => {
                                return (
                                    <Text
                                        className={`order-filter-type-item ${searchParams.billType == item.value ? "active" : ""}`}
                                        onClick={() => {
                                            setSearchParams({ ...searchParams, billType: item.value });
                                        }}>
                                        {item.text}
                                    </Text>
                                );
                            })}
                        </View>
                        {/* 时间 */}
                        <View>
                            <View className="order-filter-date" onClick={() => setShowTimePicker(true)}>
                                <View style={{ marginRight: "8px" }}> {dateRangFilterText}</View>
                                {showTimePicker ? (
                                    <TriangleUp color="#666666" size={18} />
                                ) : (
                                    <TriangleDown color="#666666" size={18} />
                                )}
                            </View>
                            <Picker
                                visible={showTimePicker}
                                options={ORDER_FILTER_DATE}
                                onClose={() => {
                                    setShowTimePicker(false);
                                }}
                                onConfirm={(option, value) => {
                                    setShowTimePicker(false);
                                    changeRangDate(option, value);
                                }}
                            />
                        </View>
                    </View>
                    {/* 列表 */}
                    <View className="order-list">
                        {monthList.map((month) => {
                            return (
                                <>
                                    {/* 月份 */}
                                    <View className="order-list-date" style={{ top: navbarHeight }}>
                                        {month.yearMonth}
                                    </View>
                                    {/* 列表 */}
                                    {month.list.map((item, index) => {
                                        return (
                                            <View
                                                className="order-list-item"
                                                style={{ marginTop: index == 0 ? "0" : "" }}>
                                                <View className="order-list-item-column">
                                                    <View className="order-list-item-label">
                                                        {formatConstData(item.billType, ORDER_TYPE_TEXT)}
                                                    </View>
                                                    <View className="order-list-item-value">
                                                        {item.billType == ORDER_TYPE_ORG.PAY ? "+" : "-"}{" "}
                                                        {formatAmountFenToYuan(item.amount)}
                                                        <Text className="order-list-item-unit">元</Text>
                                                    </View>
                                                </View>
                                                <View className="order-list-item-column">
                                                    <View className="order-list-item-label">
                                                        {formatConstData(item.billType, ORDER_TYPE_DATE)}
                                                    </View>
                                                    <View className="order-list-item-value">
                                                        {formatDate(item.createDate, "MM-DD")}
                                                    </View>
                                                </View>
                                                <View className="order-list-item-column">
                                                    <View className="order-list-item-label">账户余额</View>
                                                    <View className="order-list-item-value">
                                                        {formatAmountFenToYuan(item.laterBalance)}
                                                        <Text className="order-list-item-unit">元</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </>
                            );
                        })}
                    </View>
                    {/* 加载中 */}
                    <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {loading && <Loading type="spinner">加载中</Loading>}
                    </View>
                </>
            ) : (
                <View className="screen-padding" style={{ marginTop: "30px" }}>
                    <Image
                        src="https://iot.hzwaterit.com/iot-fe-static/iot-app-images/bg/empty.png"
                        width={"100%"}
                        mode={"widthFix"}></Image>
                    <View style={{ marginTop: "30px", width: "100%" }}>
                        <CLoginButton type={"button"}></CLoginButton>
                    </View>
                </View>
            )}
            {/* Tabbar */}
            <CTabbar value={1} />
        </View>
    );
}
