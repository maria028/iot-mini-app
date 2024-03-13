/*
 * @Author: pzy
 * @Date: 2023-11-27 16:39:18
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-13 16:48:44
 * @FilePath: /api/upload.js
 * @Description: 上传
 */
import Taro from "@tarojs/taro";
import { API_ROOT_DEV, API_ROOT_PROD, baseProxy } from "@/config";
let API_ROOT = process.env.NODE_ENV === "development" ? API_ROOT_DEV : API_ROOT_PROD;

/***
 * @description: 上传图片
 * @param {*} tempFiles 本地路径 允许数组或者字符串
 */
export const imageUpload = (tempFiles: string) => {
    return new Promise((resove, reject) => {
        Taro.uploadFile({
            url: API_ROOT + baseProxy + "/wechat-service/wechat/user/uploadPhoto",
            filePath: tempFiles,
            name: "file",
            formData: {},
            success: function (res) {
                resove(JSON.parse(res.data));
            },
            fail: function (res) {
                console.log(res);
                reject();
            }
        });
    });
};
