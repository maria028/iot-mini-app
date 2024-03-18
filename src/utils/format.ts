/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-13 15:47:39
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-18 15:05:46
 * @Description: 内容格式化
 */
// 格式化手机号
export const formatPhone = (value: string) => {
    if (!value) return "";
    const reg = /(\d{3})\d{4}(\d{4})/; // 正则表达式
    return String(value).replace(reg, "$1****$2"); // 返回加密后的电话号码
};
// 格式化金额 分->元
export const formatAmountFenToYuan = (value: string | number) => {
    if (!value) return 0;
    return (Number(value) / 100).toFixed(2);
};
