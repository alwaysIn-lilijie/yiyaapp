/*
 * @Descripttion: 
 * @version: 
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-13 03:50:58
 */
// loading.js
import React from 'react';
import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Events from '@/utils/events';

const { width, height } = Dimensions.get('window');

export default class Loading extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false,
            modalVisable:false,
        }
    }
    componentDidMount () {
        Events.addListener("loading",this._loading)
    }
    _loading = (bl) => {
        this.setState({
            modalVisable:bl,
            loading: bl,
        })
    }
    render () {
        return (
            <>
            {  this.state.modalVisable && <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff" style={[styles.loading,{zIndex: this.state.loading ? 10 : -1}]} />}
            </>
           
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        width,
        height,
        backgroundColor: "rgba(0,0,0,0.4)",
    }
})

// global.$ld() //使用loading
// global.$cld() //关闭loading


