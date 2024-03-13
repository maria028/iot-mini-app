/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-11 16:16:03
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-11 17:11:42
 * @Description:户
 */
export const MODE_TYPE: any = {
    DEV: "dev-mode", //运维模式
    NORMAL: "normal-mode" //普通模式   空也为普通模式
};

export type AccountItemType = {
    accountNumber: string;
    accountUserId: string;
    balance: number;
    description?: string;
    phoneNumber: string;
    userName?: string;
    userType?: string;
    waterNature?: string;
    waterType?: string;
    accountAddress?: string;
};
