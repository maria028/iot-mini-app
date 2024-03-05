/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-05 10:23:34
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 14:45:08
 * @Description:
 */
export type ParamsType = {
    url: string;
    data?: object;
    contentType?: string;
    responseType?: string;
};

export type OptionType = {
    url: string;
    data?: object;
    method?: any;
    header: object;
    success: any;
    error: any;
};
