/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-29 11:41:38
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-29 17:14:20
 * @Description: 
 */
import { useMemo } from 'react';
import Taro from '@tarojs/taro';

// 导航栏高度 
const useCustomNavBarParams = () => {
  const {navigationBarHeight, statusBarHeight,navbarHeight} = useMemo(() => {
    // 获取系统信息
    const sysInfo = Taro.getSystemInfoSync();
    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息
    const menuInfo = Taro.getMenuButtonBoundingClientRect();
    // 状态栏的高度，单位px
    const statusBarHeight = sysInfo?.statusBarHeight || 0
    // 标题栏高度
    const navigationBarHeight =
      (menuInfo.top - statusBarHeight) * 2 + menuInfo.height;
    //总高度
    const navbarHeight = navigationBarHeight+statusBarHeight
    return {navigationBarHeight, statusBarHeight,navbarHeight};
  }, []);

  return {navigationBarHeight, statusBarHeight,navbarHeight};
};

export default useCustomNavBarParams;
