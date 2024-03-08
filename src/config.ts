/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2023-10-08 15:28:17
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-08 11:34:54
 * @Description: 开发配置，用于开发调试
 */
// export const API_ROOT_DEV = "http://192.168.90.237:8216"; //测试开发环境
// export const  API_ROOT_DEV = 'https://120.55.62.248'//测试开发环境
export const API_ROOT_DEV = "https://iot.hzwaterit.com"; //测试开发环境
export const API_ROOT_PROD = "https://iot.hzwaterit.com"; //生产环境

// 百度地图AK
export const BAIDU_MAP_AK_JS = "YNewLCc0FsqY3z5aCwBOHAWt4mY5F668"; // 浏览器端

// 以下为凤翎方的配置
export const appName = "iot"; // 应用名称
export const TENANT = 100011; // 租户id
export const CLIENT = "iot-service"; // 应用公钥
export const CLIENT_SECRET = "1ebfa2ed02debb9ac77a5528ce7b12a3"; // 应用私钥
export const custom_flow_prefix = "fawkes_custom_flow_"; // 自定义流程前缀
export const baseProxy = "/api"; // 接口代理节点
export const pwdEncrypType = "SM4"; // 密码加密方式:MD5、SM4、SM2
export const TTL = 180; // 签名有效期，最短为180
