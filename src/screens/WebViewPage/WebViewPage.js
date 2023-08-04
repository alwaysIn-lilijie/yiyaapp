import { useTheme } from '@react-navigation/native';
import {useEffect, useState,useRef} from 'react';
import { useDispatch } from 'react-redux';
import {  StyleSheet,View,TouchableOpacity ,BackHandler,Linking} from 'react-native';
import { useSelector } from 'react-redux';
import {theme} from "@/theme"
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import {  setDeptInfo, logout,changeDeptInfo } from '@/reducers/LoginReducer';

import config from '@/config';
import TextFix from '@/components/TextFix';
export function WebViewPage({ navigation,route }) {
  const loginInfo = useSelector((state) => state.login);
  const [webUrl, setWebUrl] = useState("");
  const [webProgress, setWebProgress] = useState("");
  const [javaScriptCode, setJavaScriptCode] = useState("");
  let [backButtonEnabled,setBackButtonEnabled] = useState(false);
  const [notCloseApp,setNotCloseApp] = useState(true);
  const dispatch = useDispatch();
  const WEB_VIEW_REF = useRef(null);
  useEffect(() => {
    if (route) {

      console.log(route.params);
      if(route.params?.webUrl){
        let str=config.webBaseUrl+route.params.webUrl
        console.log(str);

        if(!notCloseApp){
          navigation.goBack();
        }
        let infoStr=`?token=${loginInfo.user.token}&deptId=${loginInfo.deptInfo.deptId}&deptArea=${loginInfo.deptInfo.deptArea}&deptName=${loginInfo.deptInfo.deptName}`
        setWebUrl(str+infoStr)
        console.log(str+infoStr);
      }
    }
    let data={
      deptInfo:loginInfo.deptInfo,
      user: loginInfo.user,
    }
    let str='window.appInfo='+JSON.stringify(data)
    console.log(str);
    setJavaScriptCode(str)
  }, [route]);


  useEffect(() => {

    if(!theme.ios){
      BackHandler.addEventListener('hardwareBackPress',onBackClicked);
      return()=>{
        BackHandler.removeEventListener('hardwareBackPress',onBackClicked);
      }
    }
  }, [notCloseApp]);


  const messageFromClient=async (event)=>{
    console.log(event);
    let data=event.nativeEvent.data
    if(data){
      data=JSON.parse(data)
      if(data.type){
        switch (data.type){
          case "logout":
            dispatch(logout());
            navigation.navigate("login");
            break;
          // case "navigate":
          //   if(data.route){
          //     navigation.navigate(data.route);
          //   }
          //   break;
          // case "goBack":
          //   navigation.goBack();
          //   break;
          case "changeUser":
            await dispatch(setDeptInfo({deptName:data.params.deptName,deptId:data.params.deptId,deptArea:data.params.deptArea}))

            break;
          case "changeDept":
            console.log(data.params);
            await dispatch(changeDeptInfo(data.params));
            break;
          case "call":
            return  Linking.openURL(`tel:${data.params.phone}`)
            break;
          default:
            navigation.goBack();
            console.log(data);
            break;
        }
      }
    }

  }
  function onBackClicked(){////监听安卓返回键

    console.log('current',WEB_VIEW_REF.current);
    if(WEB_VIEW_REF.current){
      WEB_VIEW_REF.current.goBack();
      setBackButtonEnabled(true);
      return notCloseApp;
    }else{
      navigation.goBack();
    }
    return false;
  }
  function handleRefresh(){
    WEB_VIEW_REF.current.reload()
  }
  function _onNavigationStateChange(e){
    console.log('_onNavigationStateChange',e);
    if(!theme.ios){
      if((e.url).indexOf('http')==0){
        ///处理如果是web-view中打开二级以及多级页面点击返回事返回web-view的上一页而不是直接关闭web-view

        setNotCloseApp(e.canGoBack);
      }else{
        if(backButtonEnabled){
          navigation.goBack();
        }
        console.log('_onNavigationStateChange------:'+(e.url));
      }
    }else{
      return;
    }
  }
  function renderErrorView(){
    return (
      <View style={styles.errorContainer}>
        <TextFix>数据加载失败，请确认网络连接</TextFix>
        <View style={{marginTop:20}}>
          <TouchableOpacity onPress={handleRefresh}>
            <TextFix>重新加载</TextFix>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: webUrl
        }}
        javaScriptEnabled={true}
        bounces = {false}
        ref={WEB_VIEW_REF}
        domStorageEnabled={true}////开启缓存
        thirdPartyCookiesEnabled={true}
        allowFileAccess={true}///允许文件上传
        useWebkit={true}
        renderError={renderErrorView}
        // startInLoadingState={true}
        injectedJavaScript={javaScriptCode}
        onNavigationStateChange={(e)=>_onNavigationStateChange(e)}
        style={{ flex: 1 ,backgroundColor:'#d7def6'}}
        onLoadProgress={e =>setWebProgress(e.nativeEvent.progress)}
        mixedContentMode={'always'}
        onMessage={event => {
          messageFromClient(event)
        }}
      ></WebView>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d7def6'
  },
  item_text:{
    color:"#333"
  },
  background: {

  },
  buttonLogin:{
    height:theme.DpHeight(80),
    backgroundColor:theme.colorForNormalButton,...theme.flexCenter,
    borderRadius:theme.DpWidth(12),marginTop:theme.DpHeight(60)
  },
  buttonBack:{
    height:theme.DpHeight(80),
    backgroundColor:"#fff",...theme.flexCenter,
    borderRadius:theme.DpWidth(12),marginTop:theme.DpHeight(40)
  },
  errorContainer:{
    position:'absolute',
    top:0,
    left:0,
    height:'100%',
    width:"100%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  }

});
