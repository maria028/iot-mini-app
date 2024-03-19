/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-28 17:37:15
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-03-19 16:51:06
 * @Description:
 */
import React, { useEffect, useRef } from "react";
import { View } from "@tarojs/components";
// import { EChart } from "echarts-taro3-react";

type Props = {
    canvasId: string;
    list: Array<any>;
};

const CustomChart: React.FC<Props> = ({ canvasId, list }) => {
    const refLineChart = useRef(null);

    const defautOption = {
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                    color: "rgba(220, 220, 220, 0.8)"
                }
            }
        ]
    };

    // 初始化图表
    useEffect(() => {
        // refLineChart.current.refresh(defautOption);
    }, []);

    return <View className="c-line-chart">{/* <EChart ref={refLineChart} canvasId={canvasId} /> */}</View>;
};

export default CustomChart;
