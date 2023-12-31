/*
 * @Descripttion: 
 * @version: 
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-13 02:50:05
 */
// 这是events.js
import { EventEmitter } from 'events';
const Events = new EventEmitter();

// loading
function ld () {
    Events.emit("loading", true)
}
function cld () {
    Events.emit("loading", false)
}
// toast
function toast (text) {
    Events.emit("toast", text)
}
// 弹框
function box (options) {
    Events.emit("modal", options)
}

global.$ld = ld;
global.$cld = cld;
global.$toast = toast;
global.$box = box;

export default Events;
