/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 08:52:03
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 09:03:47
 * @Description: 充值相关 ：充值、订单查询
 */
import api from "@/utils/request/api";

// 创建订单，获取支付参数
export function createOrder(param: { amount: number; description: string; orderType: string; accountNumber: string }) {
    return api.post("/pay-service/wechat/pay/createOrder", param);
}

// 查询订单
export function queryPayOrder(param: { tradeNo: number | string }) {
    return api.get("/pay-service/wechat/pay/queryPayOrder", param);
}

// 查询流水账单
export function queryBillLogList(param: {
    accountUserId: string;
    billType?: string;
    tradeType?: string;
    startTime: string;
    endTime: string;
    pageNo: number;
    pageSize: number;
}) {
    return api.post("/wechat-service/billLog/queryBillLogList", param);
}

// 账单查询统计-计算月扣费额
export function queryBillDeductionSum(param: { accountUserId: string; startTime: string; endTime: string }) {
    return api.post("/wechat-service/billLog/queryBillDeductionSum", param);
}
