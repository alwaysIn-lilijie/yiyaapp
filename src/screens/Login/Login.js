import { useTheme } from '@react-navigation/native';
import React, { useState,useEffect ,useRef} from 'react';
import { View, Image, TouchableOpacity, StatusBar, Animated, Modal ,AppState} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { changeUser, logout } from '@/reducers/LoginReducer';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { shadow, theme } from '@/theme';
import { storage } from '@/storage';
import { getAuthCode } from '@/components/dingtalk/index';
import { LoginController } from '@/controllers';
import { networkService } from '@/networking';
import TextFix from '@/components/TextFix'
// import { AntDesign } from '@expo/vector-icons';
import Picker from 'react-native-picker';
import simulatorLogin from "@/config/simulatorLogin"
import {getUpdate,loginPwd} from "@/components/api"
export function Login({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const [userSelect, setUserSelect] = useState(false);
  const [isDev] = useState(true);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loginUser,setLoginUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    // storage.clear();
    // dispatch(logout());

    if(loading){
      startAnimation();
    }

  },[loading])
  useEffect(()=>{
    if(user){
      navigation.navigate('mainPage')
    }

  },[])
  useEffect(()=>{
    if(code){
      console.log(code);
      login(code);
    }
    return()=>{

    }
  },[code])

  // useEffect(()=>{
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener("change", handleAppStateChange);
  //   };
  // },[])
  // function  handleAppStateChange(nextAppState){
  //   if (nextAppState === 'background') {
  //     setModalVisible(false)
  //   }
  // }
  const login = async(code) => {
    try {
      console.log('login');
      let loginController = new LoginController(networkService);
      let resp = await loginController.login(code);
      console.log(JSON.stringify(resp));
      if(resp.data&&resp.data.length>1){
        setLoginUser(resp.data)
        setModalVisible(true)

      }else {
        await dispatch(changeUser(resp.data[0]));
      }


    }catch (e) {

    }
    setLoading(false)
  }

  const startAnimation = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => startAnimation());
  };
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const handleSubmit = async(type) => {
    console.log(1111);
    if(loading){
      return
    }
    if(type){
      let params={
        username:'常朝龙',
        password:'dq990327'
      }
      let res=await loginPwd(params)
      console.log(res);
      return  false
    }
    if(isDev){
      // let res= await getUpdate()
      // console.log(res);
      // return
      // 模拟器登录
      try{
        let resp = simulatorLogin()
        console.log(resp);
        if (resp.code == 200) {
          let data = resp.data;
          if (data.length > 1) {
            setLoginUser(data)
            setModalVisible(true)
          }else {
            dispatch(changeUser(resp.data[0]))
            navigation.push('mainPage')



          }
        }
        return null;
      }catch(ex) {
        console.error(ex);
      }


    }else {
      setLoading(true)
      try {
        let result = await getAuthCode();
        // console.log(JSON.stringify(result));
        setCode(result.code)
      }catch (e){

        setLoading(false)
      }
    }


  };

  const showPicker = () => {
    Picker.init({
      pickerData: loginUser.map(item=>{return item.userName}),
      selectedValue:[loginUser[0].userName],
      pickerBg:[255,255,255,1],
      pickerTitleText:'请您选择登录账号',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      pickerConfirmBtnColor:[40, 121, 255, 1],
      pickerCancelBtnColor:[149, 154, 162, 1],
      onPickerConfirm:async data => {
        let result=null
        loginUser.forEach(item=>{
          if(item.userName==data[0]){
            result= item
          }
        })
        await dispatch(changeUser(result));
        setModalVisible(false)
      },
      onPickerCancel: data => {
        console.log('picker cancel:', data);
        setModalVisible(false)
        logoutHandle()
      },
      onPickerSelect: data => {
        // setModalVisible(false)
        // console.log('picker select:', data);
      },
    });
    Picker.show();
  };
  const logoutHandle = ()=>{
    dispatch(logout());
  }
  if(user){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}></View>
    )
  }
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar  backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <Modal
        transparent={true}
        onShow={showPicker}
        visible={modalVisible}
        style={{flex:1}}
        onDismiss={()=>{
          Picker.hide();
        }}
        onRequestClose={() => {}}>
        <View style={{flex:1,backgroundColor:'#000',opacity:0.3,height:"100%",width:"100%",position:"absolute"}}></View>
      </Modal>
      <View style={{marginTop:theme.DpHeight(284),display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
        <Image source={require('@/assets/ic_launcher.png')} style={{width:theme.DpWidth(114),height:theme.DpWidth(114), resizeMode:'contain'}} />
        <TextFix style={{fontSize:theme.fontSize32,color: theme.colorForNormal4Text,textAlign:'center',marginTop:10}}>咿呀通</TextFix>
      </View>
      <View style={{flex:1,paddingLeft:theme.DpWidth(60),paddingRight:theme.DpWidth(60)}}>
        <TouchableOpacity style={[styles.loginBox]} onPress={()=>handleSubmit()}>

          <Image source={require('@/assets/dingding.png')} style={{width:theme.DpWidth(48),height:theme.DpWidth(48), resizeMode:'contain'}} />
          <View style={{ marginLeft:5}}>
            <TextFix style={{fontSize:theme.fontSize32, color:'#fff'}}>{loading ? "正在登录中" : '登录'}</TextFix>
          </View>
        </TouchableOpacity>
      </View>
      {/*<View style={{flex:1,paddingLeft:theme.DpWidth(60),paddingRight:theme.DpWidth(60)}}>*/}
      {/*  <TouchableOpacity style={[styles.loginBox2]} onPress={()=>handleSubmit(1)}>*/}

      {/*    <View style={{ marginLeft:5}}>*/}
      {/*      <TextFix style={{fontSize:theme.fontSize32, color:'#fff'}}>{loading ? "正在登录中" : '游客登录'}</TextFix>*/}
      {/*    </View>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  )
}
