import HmacSHA1 from "crypto-js/hmac-sha1";
import Base64 from "crypto-js/enc-base64";
import dayjs from "dayjs";
import { CLIENT, CLIENT_SECRET, TTL } from "@/config";
import { validatenull } from "../validate";

const Dvalue = () => {
    //在这里省去了服务器校验时间这一步，所以默认返回的是0
    return 0;
    // return storage.get("ts-D-value") == undefined ? 0 : Number(storage.get("ts-D-value"));
};

//获取加密后的url参数字符串
/**
 * @param {object} 对象中的属性为需要加密的属性
 * @example 'https://apigateway.ecidi.com/fawkes-new/staging/api/sys-storage/download_image?' +  getUrl({ f8s: fileToken })
 * @return https://apigateway.ecidi.com/fawkes-new/staging/api/sys-storage/download_image?f8s=4c1c912f03786cfa2473bb880d75e2c0&ts=1602323667077&ttl=30&uid=fawkes&sign=xmSwtplBxRp5nSiIjCDju8kizEk%3D
 */
const getUrl = (rest: any) => {
    let Params = "";
    let ts = dayjs().unix() + Dvalue();
    let ttl = TTL;
    let obj = rest;
    Params += "ts=" + ts + "&ttl=" + ttl + "&uid=" + CLIENT + (validatenull(obj) ? "" : "&" + objTransUrlParams(obj));
    let ParamArr = sortUrlParams(Params);
    ParamArr = objKeySort(ParamArr);
    let paramstr: any = [];
    for (let i in ParamArr) {
        paramstr.push(i + "=" + ParamArr[i]);
    }
    paramstr = paramstr.join("&");
    let signWordArray = HmacSHA1(paramstr, CLIENT_SECRET);
    let sign = Base64.stringify(signWordArray);
    let encodeSign = encodeURIComponent(sign);
    return paramstr + "&sign=" + encodeSign;
};

// 获取加密后的参数对象
/**
 * @param {object} 对象中的属性为需要加密的属性
 * @example getSign({ f8s: fileToken })
 * @return 
 * {
    f8s: "c15cf2e99c9b46cfc4ced4d2301b6aef"
    sign: "AuBRUDz6qzBXW4B+sg1GiptuIys="
    ts: "1602499441622"
    ttl: "30"
    uid: "fawkes"}
 */
const getSign = (rest: any) => {
    let Params = "";
    let ts = dayjs().unix() + Dvalue();
    let ttl = TTL;
    let obj = rest;
    Params += "ts=" + ts + "&ttl=" + ttl + "&uid=" + CLIENT + (validatenull(obj) ? "" : "&" + objTransUrlParams(obj));
    let ParamArr = sortUrlParams(Params);
    ParamArr = objKeySort(ParamArr);
    let paramstr: any = [];
    for (let i in ParamArr) {
        paramstr.push(i + "=" + ParamArr[i]);
    }
    paramstr = paramstr.join("&");
    let signWordArray = HmacSHA1(paramstr, CLIENT_SECRET);
    let sign = Base64.stringify(signWordArray);
    return {
        sign,
        ts,
        ttl,
        uid: CLIENT,
        ...ParamArr
    };
};

const objKeySort = (obj: object) => {
    let newkey = Object.keys(obj).sort();
    let newObj = {};
    for (let i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
};

const sortUrlParams = (str: any) => {
    if (typeof str !== "string") {
        return {};
    }
    let paramObj = {};
    let paramArr = decodeURI(str).split("&");
    // let paramArr = str.split('&');
    for (let i = 0; i < paramArr.length; i++) {
        let tmp = paramArr[i].split("=");
        let key = tmp[0];
        let value = tmp[1] || "";
        //if (typeof value === 'string' && isNaN(Number(value)) === false && value !== "") {
        //  value = Number(value);
        //}
        if (typeof paramObj[key] === "undefined") {
            paramObj[key] = value;
        } else {
            let newValue = Array.isArray(paramObj[key]) ? paramObj[key] : [paramObj[key]];
            newValue.push(value);
            paramObj[key] = newValue;
        }
    }
    return paramObj;
};

const objTransUrlParams = (obj: object) => {
    const params: any = [];
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        if (typeof value === "undefined") {
            value = "";
        }
        params.push([key, value].join("="));
    });
    return params.join("&");
};

export { getUrl, getSign };
