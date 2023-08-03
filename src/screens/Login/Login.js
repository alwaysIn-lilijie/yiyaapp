import React, { useState,useEffect ,useRef} from 'react';
import { View, ImageBackground, Text, Image, TouchableOpacity, StatusBar, Animated, Modal ,AppState} from 'react-native';

export function Login() {
  /*const { colors } = useTheme();
  const dispatch = useDispatch();
  const [userSelect, setUserSelect] = useState(false);
  const [isDev] = useState(false);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const errors =useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const appVersion = Application.nativeApplicationVersion
  const [loginUser,setLoginUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    if(loading){
      startAnimation();
    }

  },[loading])
  useEffect(()=>{
    if(code){
      console.log(code);
      login(code);
    }
    return()=>{

    }
  },[code])

  useEffect(()=>{
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  },[])
  function  handleAppStateChange(nextAppState){
    if (nextAppState === 'background') {
      setModalVisible(false)
    }
  }
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
  const handleSubmit = async() => {
    if(loading){
      return
    }
    setLoading(true)
    if(isDev){
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
            await dispatch(changeUser(resp.data[0]));
          }
        }
        return null;
      }catch(ex) {
        console.error(ex);
      }


    }else {
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
  }*/
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar  backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <Text>login</Text>
    </View>
  )
}