/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect ,useRef} from 'react';
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,Linking,ScrollView
} from 'react-native';
import { theme } from '@/theme';
console.disableYellowBox=true;
// console.warn("YellowBox is disabled.")
import config from "@/config";
import App from './App';
import ProgressBar from 'react-native-progress/Bar';
/*热更新*/
import CodePush from "react-native-code-push"
import {getUpdate} from "@/components/api"
import TextFix from '@/components/TextFix';
import {ENV} from '@/config'
const CodeUpdate = () => {

  const appVersion = DeviceInfo.getVersion();
  console.log(appVersion);

  const [modalVisible, setModalVisible] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);
  const [immediateUpdate, setImmediateUpdate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState([]);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [syncMessage, setSyncMessage] = useState('');
  const [currProgress, setCurrProgress] = useState(0.0);
  const [url, setUrl] = useState('');
  const progressRef = useRef(null);
  /*热更新函数，发布的时候放开*/
  useEffect(() => {
    // if(ENV=='dev'){
      SplashScreen.hide()
    // }else {
      allUpdate()
    // }
  }, [])

  const allUpdate= async ()=>{
    try{
      // let res= await getUpdate()
      // console.log('111111111',res);
      // console.log(appVersion);
      // if(res.code=='200'){
      //
      //   let appVersionOnline=res.data.appVersion
      //   // let appVersionOnlineNumber=appVersionOnline.replaceAll('.')
      //   // let appVersionNumber=appVersion.replaceAll('.')
      //   if(appVersionOnline !=appVersion){
      //     // SplashScreen.hide()
      //     setModalVisible(true);
      //     setUrl(res.data.url);
      //     let strArray=[]
      //     if(res.data.description){
      //       strArray=res.data.description.split('n')
      //     }
      //     setUpdateInfo(strArray);
      //     setIsMandatory(false)
      //   }else {
      //     CodePush.disallowRestart()
      //     syncImmediate()
      //   }
      //   console.log(res.data);
      // }
      CodePush.disallowRestart()
      syncImmediate()
      // console.log(res);
    }catch (error){
      console.log(error);
    }



  }

  const syncImmediate = () => {
    let deploymentKey=config["CodePushDeploymentKey"][Platform.OS]
    console.log(deploymentKey)
    CodePush.checkForUpdate(deploymentKey).then((update) => {
      console.log( update,'update')
      if (!update) {
        CodePush.allowRestart();//在加载完了，允许重启
        /*启动页控制*/
        SplashScreen.hide()
      } else {
        // SplashScreen.hide()
        console.log(update);
        let strArray=[]
        if(update.description){
          strArray=update.description.split('n')
        }
        setUpdateInfo(strArray);
        setIsMandatory(update.isMandatory);
        setModalVisible(true);
      }
    })
  }

  const openUrl=()=>{
    Linking.openURL(url)
  }
  const _immediateUpdate=()=>{
    setImmediateUpdate(true);

    CodePush.sync(
      {
        updateDialog: false,
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      (status)=>{
        console.log(status)
        switch(status) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            setSyncMessage('Checking for update');
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            setSyncMessage('Downloading package');
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            setSyncMessage('Awaiting user action');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            setSyncMessage('Installing update');
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            setSyncMessage('App up to date.');
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            setSyncMessage('Update cancelled by user');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            setSyncMessage('Update installed and will be applied on restart.');
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            setSyncMessage('An unknown error occurred');
            setModalVisible(false);
            break;
        }
      },
      ({receivedBytes, totalBytes})=>{
        setReceivedBytes(receivedBytes);
        setTotalBytes(totalBytes);
        const currProgress = parseFloat(receivedBytes / totalBytes).toFixed(2);
        setCurrProgress(currProgress);
        console.log(currProgress);
        if(currProgress >= 1) {
          /*启动页控制*/
          SplashScreen.hide()
          CodePush.allowRestart();//在加载完了，允许重启
          // setModalVisible(false);
          // CodePush.restartApp();
          setTimeout(() => {

            CodePush.restartApp(true)

          }, 300);
        }
      }

    )
  }
  const renderModal=()=> {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            {
              !immediateUpdate ?
                <View style={{position:'relative',}}>
                  <Image style={{width:theme.screenWidth*0.8,height: 214}} source={require('./assets/newupdate.jpg')} />

                  {/*<Image style={{width:'100%'}} source={require('./assets/house.png')} resizeMode={'contain'}/>*/}
                  {/*<View><TextFix>111111</TextFix></View>*/}
                  <View style={{backgroundColor:"#fff",marginTop:-50,width:theme.screenWidth*0.8, }}>
                    <View style={{paddingTop:20}}>
                      <TextFix style={{fontSize:theme.DpFont(40),textAlign:'center',color:'#2D405E'}}>检测到有新版本</TextFix>
                      {/*<TextFix style={{marginVertical: 20, fontSize: 17, color: theme.lightBlack}}>更新内容</TextFix>*/}
                      <ScrollView style={{paddingHorizontal:20,marginTop:50,marginBottom:20,height:80}}>
                        {
                          updateInfo.map((item,index)=>{
                            return  <TextFix style={{lineHeight: 20,marginBottom:5}}>{index+1+':'+item}</TextFix>

                          })
                        }
                      </ScrollView>
                    </View>
                    {/*<View style={{alignItems: config.center, marginTop: 20}}>*/}
                    {/*    <Text style={{fontSize: 12, color: config.textGray,fontWeight:'100'}}>wifi情况下更新不到30秒</Text>*/}
                    {/*</View>*/}
                    {
                      !isMandatory ?
                        <View style={{flexDirection: theme.row, height: 50, alignItems: theme.center, borderTopColor: theme.lightGray, borderTopWidth: 1,justifyContent:'center' }}>
                          {/*<TouchableOpacity*/}
                          {/*  >*/}
                          {/*  <View style={{flexDirection: theme.row,alignItems: theme.center, width: (theme.screenWidth - 60) / 2, height: 50, borderRightColor: theme.lightGray, borderRightWidth: 1,justifyContent: theme.center}}>*/}
                          {/*    /!*<Icon name={'oneIcon|reject_o'} size={20} color={'#B6B6B6'}/>*!/*/}
                          {/*    <Text style={{fontSize: 17, fontWeight: 'bold', color: theme.lightGray, marginLeft: 10}}>残忍拒绝</Text>*/}
                          {/*  </View>*/}
                          {/*</TouchableOpacity>*/}
                          <TouchableOpacity
                            style={{flexDirection: theme.row, alignItems: theme.center, width: (theme.screenWidth - 60) , height: 50,  justifyContent: theme.center}}
                            onPress={() => openUrl()}
                          >
                            <View style={{backgroundColor:theme.colorForNormalButton,width:theme.screenWidth*0.7, height: 40, alignItems: theme.center, justifyContent: theme.center, margin: 10, borderRadius: 20}}>
                              <Text style={{fontSize: 16, color: "#fff", fontWeight: '100',}}>极速下载</Text>
                            </View>
                          </TouchableOpacity>
                        </View> :
                        <View style={{flexDirection: theme.row, height: 60, alignItems: theme.center, borderTopColor: theme.lightGray, borderTopWidth: 1, width: theme.screenWidth*0.8,justifyContent:'center'}}>
                          <TouchableOpacity
                            style={{flexDirection: theme.row,  width: (theme.screenWidth - 60), height: 50, alignItems: theme.center, justifyContent: theme.center}}
                            onPress={() =>_immediateUpdate()}
                          >
                            <View style={{backgroundColor: theme.colorForNormalButton, flex: 1, height: 40, alignItems: theme.center, justifyContent: theme.center, borderRadius: 20, marginHorizontal: 40}}>
                              <Text style={{fontSize: 16, color: "#fff", fontWeight: '100'}}>立即更新</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
                </View> :
                <View>
                  <Image style={{width:theme.screenWidth*0.8,height:214}} source={require('./assets/newupdate.jpg')}/>
                  <View style={{width:theme.screenWidth*0.8, paddingVertical: 20, backgroundColor: '#fff', alignItems: theme.center,paddingHorizontal: 20,marginTop:-50}}>
                    <ProgressBar progress={currProgress} width={200} height={5} />
                    {/*<View style={{alignItems: config.center, marginVertical: 2}}>*/}
                    {/*    <Text>{receivedBytes}byte / {totalBytes}bytes</Text>*/}
                    {/*</View>*/}
                    <View style={{alignItems: theme.center, marginTop:30}}>
                      <Text style={{fontSize: 14, color: theme.textGray}}>{receivedBytes==0?'正在连接服务器':'正在下载更新'}</Text>
                    </View>
                  </View>
                </View>
            }
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <View style={{flex:1}}>
      {renderModal()}
      <App />
    </View>

  );
}


let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
const CodeUpdateWithCodePush = CodePush(codePushOptions)(CodeUpdate);
export default CodeUpdateWithCodePush
// AppRegistry.registerComponent(appName, () => CodeUpdateWithCodePush);











const styles = StyleSheet.create({
  modal: {
    position:'relative',
    height: theme.screenHeight,
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  modalContainer: {
   width:theme.screenWidth*0.8,
    marginTop:-150,
    // backgroundColor:'#fff',
    borderRadius:10
  }
})
