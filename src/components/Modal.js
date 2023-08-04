/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-13 03:51:26
 */
// (Modal.js)弹窗
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Events from '@/utils/events';
import { theme } from '@/theme';
import TextFix from '@/components/TextFix';

const { width, height } = Dimensions.get('window');
export default class PopUp extends React.Component {
    constructor () {
        super();
        this.state = {
            modalVisible: false,
            modalOptions: {}
        }
    }
    componentDidMount () {
        Events.addListener("modal",this._modal)
    }
    componentWillUnmount() {
        this.setState({
            modalVisible: false,
            modalOptions: {}
        })
    }

    _modal = (options) => {
        this.setState({
            modalVisible: true,
            modalOptions: options
        })
    }
    render () {
        return (
            <Modal
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                transparent={true}
                animationType="fade"
                >
                <View style={styles.modal}>
                    <View style={styles.content}>
                        <TextFix style={styles.tips}>{this.state.modalOptions.text}</TextFix>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    modalOptions: {}
                                })
                            }} style={[styles.btns,{borderRightColor: "#eee", borderRightWidth: 1}]}>
                                <TextFix style={{...styles.btnsText,color:theme.colorForNormal3Text}}>取消</TextFix>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    modalOptions: {}
                                })
                                this.state.modalOptions.callback();
                            }} style={styles.btns}>
                                <TextFix style={styles.btnsText}>确定</TextFix>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    content: {
        width: width * 0.8,
        minHeight: height * 0.12,
        paddingTop: 10,
        borderRadius: 4,
        backgroundColor: "#fff",
        fontSize: 16
    },
    tips: {
        fontSize: 16,
        lineHeight: 20,
        minHeight: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        textAlign: "center",
        padding: 10
    },
    btns: {
        textAlign: "center",
        height: 40,
        flex: 1
    },
    btnsText: {
        textAlign: "center",
        lineHeight: 40,
        fontSize: theme.fontSize28,
        color: theme.colorForNormalButton
    }
})

// global.$box({
// 	text: '提示信息', // 弹框提示信息(我设置的字段是text)
// 	callback: () => {console.log('我点击了确定按钮')} //确定按钮要做的事件
// }) // 弹框提示
