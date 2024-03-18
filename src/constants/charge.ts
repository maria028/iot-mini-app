/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-18 15:43:00
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 15:58:15
 * @Description:充值枚举值
 */
// 订单查询结果
// 枚举值参考https://pay.weixin.qq.com/docs/merchant/apis/mini-program-payment/query-by-wx-trade-no.html  trade_state
export const ORDER_PAY_RESULT = [
    {
        value: "SUCCESS",
        label: "支付成功"
    },
    {
        value: "REFUND",
        label: "转入退款"
    },
    {
        value: "NOTPAY",
        label: "未支付"
    },
    {
        value: "CLOSED",
        label: "已关闭"
    },
    {
        value: "REVOKED",
        label: "已撤销"
    },
    {
        value: "USERPAYING",
        label: "用户支付中"
    },
    {
        value: "PAYERROR",
        label: "支付失败"
    },
    {
        value: "",
        label: "查询失败"
    }
];
