import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {getWidthDp,getHeightDp,getFontDp} from "@/utils/px2dp";
import {Dimensions, Platform} from 'react-native';
export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#B0BEC5',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#212121',
      border: '#212121',
      activeTab: '#1976D2',
      inactiveTab: '#757575',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#212121',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#FFFFFF',
      border: '#FFFFFF',
      activeTab: '#4FC3F7',
      inactiveTab: '#FFFFFF',
    },
  },
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  commonPadding:{  //统一padding
    paddingLeft:getWidthDp(32),
    paddingRight: getWidthDp(32)
  },
  flexCenter:{
    display:"flex",
    justifyContent:"center",
    alignItems:'center'
  },
  fontSize32:getFontDp(32),
  fontSize28:getFontDp(28),
  colorForNormalText:"#2D405E",
  colorForNormal2Text:"#5B6576",
  colorForNormal3Text:"#959AA2",
  colorForNormal4Text:"#303030",
  colorForNormalButton:"#2879FF",
  bgColor:'#F5F6F9',
  DpFont(num){
    return  getFontDp(num)
  },
  DpWidth(num){
    return  getWidthDp(num)
  },
  DpHeight(num){
    return  getHeightDp(num)
  },
  btnActiveOpacity: 0.5,
  actionBar: {
    height: 44,//Platform.OS === 'android' ? 56 : 44 //根据不通平台高度不一致
    backgroundColor: '#fff'
  },
  headerBar:{marginTop:  (Platform.OS === 'android' ? 0 : (isIphoneX() ? 0 : 20))},
  barContentPad: (Platform.OS === 'android' ? 0 : (isIphoneX() ? 42 : 20)),
  bottomPadding: isIphoneX() ? 18 : 0,
  // 常用颜色
  primaryColor: '#EE0000',
  lightGray: '#f5f5f5',

  darkGray: '#e5e5e5',
  mainColor: '#2E73FF',
  lightBlack: '#333333',
  textGray:'#bcbcbc',
  center:'center',
  row:'row',
  ios:Platform.OS==='ios',
  hideStatusBarPaddingTop:{
    marginTop:40
  }
};

export function isIphoneX() {
  let dimension = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (dimension.height === 812 || dimension.width === 812)
  );
}
