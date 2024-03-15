/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-11 11:19:37
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-15 15:56:33
 * @Description:
 */
import api from "@/utils/request/api";
// 获取绑定的户列表
export function getAppUserAccount() {
    return api.post("/iot-service/userDetail/getAppUserAccount", {});
}

//已绑定的用户 查询户信息
export function getAccountNumberDetail(accountNumber: string) {
    return api.get("/iot-service/userDetail/getAccountNumber", { accountNumber });
}

// 根据户号获取户号详情 任意用户可查询
export function getAccountNumber(accountNumber: string) {
    return api.get("/iot-service/userDetail/getAccountNumber", { accountNumber });
}

// 用户户号绑定
export function bindUserAccount(params: { accountNumber: string; description?: string }) {
    return api.post("/iot-service/userDetail/bindUserAccount", params);
}

// 修改绑定的户的备注信息
export function updateDescription(params: { accountUserId: string; description?: string }) {
    return api.post("/iot-service/userDetail/updateDescription", params);
}
