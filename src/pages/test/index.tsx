/*
 * @Author: pzy 1012839072@qq.com
 * @Date: 2024-02-05 10:16:14
 * @LastEditors: pzy 1012839072@qq.com
 * @LastEditTime: 2024-02-28 10:21:31
 * @Description:
 */
import { Component } from "react";
import { View, Button } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";

import "./index.scss";

export const CounterComponent = () => {
    const counter = useSelector((state: any) => state.counter);
    return <View>{counter.num}</View>;
};

export const CounterComponentAdd = () => {
    const dispatch = useDispatch();

    return (
        <View>
            <Button onClick={() => dispatch({ type: "ADD" })}>1.ADD counter</Button>
            <Button onClick={() => dispatch({ type: "MINUS" })}>2.MINUS counter</Button>
        </View>
    );
};
class Index extends Component<any> {
    componentWillReceiveProps(nextProps: any) {
        console.log(this.props, nextProps);
    }
    render() {
        return (
            <View>
                <CounterComponent></CounterComponent>
                <CounterComponentAdd></CounterComponentAdd>
            </View>
        );
    }
}

export default Index;
