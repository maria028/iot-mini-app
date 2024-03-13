import api from "@/utils/request/api";
// 获取绑定的户列表
export function getAppUserAccount() {
    return api.post("/iot-service/userDetail/getAppUserAccount", {});
}
