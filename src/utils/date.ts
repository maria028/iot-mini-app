/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-03-01 10:26:31
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-01 10:42:17
 * @Description: 时间相关工具
 */
import dayjs from 'dayjs';

// 格式化时间
export const formatDate = (date = new Date(),format='YYYY-MM-DD') => {
    return dayjs(date).format(format)
  }

// 格式化时间为周几
export const formatDateToWeekDay = (date = new Date(),text='星期') => {
    let week = ["日", "一", "二", "三", "四", "五", "六"]; //一周中的一天，星期天是 0
    return text + week[dayjs(date).day()];
  }