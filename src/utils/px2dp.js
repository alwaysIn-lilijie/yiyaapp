/**
 * width: 750
 * height: 1334
 * pixel: 2
 * 如果需要更改只需改动：uiWidthPx 、 uiHeightPx 、 defaultPixel 即可
 */

import { Dimensions, PixelRatio } from 'react-native';

//定义设计稿总宽高 单位是px
const uiWidthPx = 750;
const uiHeightPx = 1334;
//获取屏幕宽度
const deviceWidthDp = Dimensions.get('window').width;
//获取屏幕高度
const deviceHeightDp = Dimensions.get('window').height;
//获取字体大小缩放比例
let fontScale = PixelRatio.getFontScale();
//获取当前设备像素密度
let pixelRatio = PixelRatio.get();
console.log('pixelRatio',pixelRatio);
//像素密度
let defaultPixel = pixelRatio||2;
//单位转换成dp
const uiWidthDp = uiWidthPx / defaultPixel;
const uiHeightDp = uiHeightPx / defaultPixel;
//现在设计稿一般都用iphone6的尺寸750*1334来做，如果你的设计稿不是按照这个来，就改一下设计稿总宽高以及像素密度
//获取缩放比例
let scale = Math.min(deviceHeightDp / uiHeightDp, deviceWidthDp / uiWidthDp)
//直接传设计稿元素宽度
export const getWidthDp = (uiEleWidthPx) => {
    return (uiEleWidthPx * scale) / defaultPixel;
}
//直接传设计稿元素高度
export const getHeightDp = (uiEleHeightPx) => {
    return (uiEleHeightPx * scale) / defaultPixel;
}
//直接传设计稿字体大小
export const getFontDp = (number) => {
    number = Math.round((number * scale) / fontScale / defaultPixel);
    return number;
}
