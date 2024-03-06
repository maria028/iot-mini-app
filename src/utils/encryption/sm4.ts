/*
 * @Description: SM4 加密/解密
 * @Author: ye_xf
 * @Date: 2021-02-04 10:13:58
 * @LastEditTime: 2024-03-06 11:49:04
 * @LastEditors: pzy 1012839072@qq.com
 * @Reference:
 */

// import { sm2 } from "sm-crypto";
import { SM4Util } from "./sm4util.js";
// #SM2后端公钥
let SM2_BACK_PUBLICK_KEY =
    "042035cffeacda14f4a768425070db8fbe136c72b835818c555debe330c1d220da514ca466b6c171cc2445844c70cb0032ee7df0b4a11fd4097a929770fc33c07d";
// #SM2前端端公钥
// let SM2_PUBLICK_KEY = '045aa0015cc1b6bfdefa5afd4046c78b5b090cd658d92a26315bff6c805b1fcfb279b3b5bad168ff1a1fdb7ed91d4101ef34ae629143fdb921c643f73dbb9cd13e'
// #SM2私钥
let SM2_PRIVATE_KEY = "3ef9efeaf054adbfafdf106c9510fcbdfb4cdff2bd52f16de9bbc005a39fe970";
// let SM2_PRIVATE_KEY = 'fadf82c47128710e0e5ccb21c9c5fb86ff5b5f72aa7b17c1f7d779023b004497'
// #SM4密钥
let SM4_KEY = "43869399C1411A3BE71A99B35123AEFC";
//生成SM4密钥
function getKey(length = 32) {
    let random = "0123456789ABCDEF";
    let str = "";

    for (let i = 0; i < length; i++) {
        str = str + random.charAt(Math.floor(Math.random() * 16));
    }

    return str;
}

//加密
function encrypt(plaintext, key) {
    const sm4 = new SM4Util(key);

    if (plaintext instanceof Object) {
        plaintext = JSON.stringify(plaintext);
    }

    const encryptData = sm4.encryptData_ECB(plaintext);

    if (!encryptData) {
        return false;
    } else {
        return encryptData;
    }
}

//解密
function decrypt(ciphertext, key) {
    const sm4 = new SM4Util(key);
    let decryptData = sm4.decryptCustom_ECB(ciphertext);

    if (!decryptData) {
        return false;
    }

    if (decryptData.charAt(0) === "{" || decryptData.charAt(0) === "[") {
        decryptData = JSON.parse(decryptData);
    }

    return decryptData;
}

//接口数据加密
export function SM4Encrypt(data) {
    const encryptData = encrypt(data, SM4_KEY);

    if (!encryptData) {
        console.error("数据加密失败");
        return;
    }
    return encryptData;
}

//接口数据解密
export function SM4Decrypt(data) {
    if (!SM4_KEY) {
        console.error("SM4密钥错误");
        return;
    }
    const decryptData = decrypt(data, SM4_KEY); //使用SM4_KEY解密
    if (!decryptData) {
        console.error("SM4密钥解密失败");
        return;
    }
    return decryptData;
}
