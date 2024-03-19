/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 15:43:00
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-19 14:26:48
 * @Description:充值枚举值
 */
// 订单查询结果
// 枚举值参考https://pay.weixin.qq.com/docs/merchant/apis/mini-program-payment/query-by-wx-trade-no.html  trade_state
export const ORDER_PAY_RESULT = [
    {
        value: "SUCCESS",
        text: "支付成功"
    },
    {
        value: "REFUND",
        text: "转入退款"
    },
    {
        value: "NOTPAY",
        text: "未支付"
    },
    {
        value: "CLOSED",
        text: "已关闭"
    },
    {
        value: "REVOKED",
        text: "已撤销"
    },
    {
        value: "USERPAYING",
        text: "用户支付中"
    },
    {
        value: "PAYERROR",
        text: "支付失败"
    },
    {
        value: "",
        text: "查询失败"
    }
];
export const ORDER_TYPE_ORG = {
    PAY: "pay", //充值
    DEDUCT: "deduct" //生成水费
};
// 订单类型选择
export const ORDER_TYPE = [
    {
        value: "",
        text: "全部"
    },
    {
        value: ORDER_TYPE_ORG.PAY,
        text: "充值"
    },
    {
        value: ORDER_TYPE_ORG.DEDUCT,
        text: "生成水费"
    }
];
// 订单类型文案
export const ORDER_TYPE_TEXT = [
    {
        value: ORDER_TYPE_ORG.PAY,
        text: "充值金额"
    },
    {
        value: ORDER_TYPE_ORG.DEDUCT,
        text: "生成水费"
    }
];
// 订单类型文案-日期
export const ORDER_TYPE_DATE = [
    {
        value: ORDER_TYPE_ORG.PAY,
        text: "充值日期"
    },
    {
        value: ORDER_TYPE_ORG.DEDUCT,
        text: "生成日期"
    }
];
// 订单查询时间
export const ORDER_FILTER_DATE = [
    {
        value: "6months",
        text: "6个月内"
    },
    {
        value: "3months",
        text: "3个月内"
    }
];
