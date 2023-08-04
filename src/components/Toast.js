/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-13 03:51:13
 */
// toast.js
import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Events from '@/utils/events';
export default class Toast extends React.Component {
    constructor () {
        super();
        this.state = {
            modalVisible: false,
            toastText: ''
        }
    }
    componentDidMount () {
        Events.addListener("toast",this._toast)
    }
    _toast = (text) => {
        this.setState({
            modalVisible: true,
            toastText: text
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalVisible: false,
                    toastText: ''
                })
            }, 2000)
        })
    }
    componentWillUnmount() {
        this.setState({
            modalVisible: false,
            toastText: ''
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
                        <Text>{this.state.toastText}</Text>
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
    },
    content: {
        position:'absolute',
        bottom:80,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        backgroundColor: "#fff",
        fontSize: 16
    }
})
// global.$toast('提示信息') // toast提示

