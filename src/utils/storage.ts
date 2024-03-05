/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 16:42:15
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-05 10:36:16
 * @Description:
 */
import Taro from "@tarojs/taro";
import { validatenull } from "./validate";

const keyName = "IOT-";

type Obj = {
    dataType?: string;
    content?: any;
    datetime?: string | number;
};

export default {
    // 存储localStorage
    set: (name: string, value: any) => {
        name = keyName + name;
        const obj: Obj = {
            dataType: typeof value,
            content: value,
            datetime: new Date().getTime()
        };
        Taro.setStorage({
            key: name,
            data: JSON.stringify(obj)
        });
    },
    // 获取localStorage
    get: (name: string) => {
        name = keyName + name;
        let obj: Obj = {};
        let content: any = "";
        if (validatenull(obj)) return;
        try {
            obj = JSON.parse(Taro.getStorageSync(name));
        } catch {
            return obj;
        }
        if (obj.dataType == "string") {
            content = obj.content;
        } else if (obj.dataType == "number") {
            content = Number(obj.content);
        } else if (obj.dataType == "boolean") {
            content = obj.content;
        } else if (obj.dataType == "object") {
            content = obj.content;
        }
        return content;
    },
    // 删除localStorage
    remove: (name: string) => {
        name = keyName + name;
        Taro.removeStorage({
            key: name
        });
    },
    // 清空全部localStorage
    clear: () => {
        Taro.clearStorage();
    }
};
