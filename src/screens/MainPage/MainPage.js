import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Modal, StyleSheet } from 'react-native';
import { FlatList,StatusBar, Text, View, TouchableOpacity,AppState } from 'react-native';
import { useSelector } from 'react-redux';
import {logout,setDeptInfo,setMenus} from '@/reducers/LoginReducer';
import Picker from 'react-native-picker';
import {theme} from "@/theme"
import TextFix from '@/components/TextFix'
import { getDeptList, getUserMenu } from '@/components/api';
import { CommonActions } from '@react-navigation/native';

export function MainPage({ navigation }) {
  const user = useSelector((state) => state.login.user);

  const [showDeptList, changeShowDeptList] = useState(false);
  const menuList= useSelector((state) => state.login.menuList);
  const dept = useSelector((state) => state.login.deptInfo);
  const [deptList, setDptList] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [pickerData, setPickerData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menus, setMenus] = useState([]);

  const changeShowDept = () => changeShowDeptList((showDeptList) => !showDeptList);
  const initMenu =async () => {
    const res = await getUserMenu();
    console.log('11111111111',JSON.stringify(res))
    if(res.menus){
      // res.menus.push({"name":"集团","details":[{"menuId":2701,"menuName":"集团收入","path":"webViewPage?/marketHouse/dataList","icon":"#","visible":null,"orderNum":null,"iconPath":"https://yiya-erp.oss-cn-shanghai.aliyuncs.com/dingding/dingding_1682574719316_9409b884.png","groupCadrePermission":true}],"pmenuId":2699})
      // dispatch(setMenus(res.menus))
      setMenus(res.menus)
    }

  }

  // useEffect(() => {
  //   initMenu();
  //   initDeptList()
  //   return()=>{
  //     setModalVisible(false)
  //     setSelectedMenu(null)
  //   }
  // }, []);

  useEffect(() => {
    initMenu();
    initDeptList();

    return()=>{
      setModalVisible(false)
      setSelectedMenu(null)
    }
  }, []);
  // useEffect(()=>{
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener("change", handleAppStateChange);
  //   };
  // },[])
  function  handleAppStateChange(nextAppState){
    if (nextAppState === 'background') {
      setModalVisible(false)
    }
  }


  const initDeptList = useCallback(async () => {
    const res = await getDeptList();

    let array=[];
    let data=res.data
    setDptList(data)
    data.forEach((item)=>{
      if(item.sysDeptList&&item.sysDeptList.length){
        let objChildrends=[]
        let sysDeptList=item.sysDeptList;
        sysDeptList.forEach(child=>{
          objChildrends.push(child.deptName)
        })
        array.push({[item.name]:objChildrends})
      }
    })
    setPickerData(array)
  }, []);

  const showPicker = () => {
    Picker.init({
      pickerData: pickerData,
      selectedValue: [dept.deptArea,dept.deptName],
      pickerBg:[255,255,255,1],
      pickerTitleText:'请选择',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      pickerConfirmBtnColor:[40, 121, 255, 1],
      pickerCancelBtnColor:[149, 154, 162, 1],
      onPickerConfirm: data => {
        console.log(data);
        let result=null
        deptList.forEach(item=>{
          if(item.name==data[0]){
            result= item.sysDeptList.find((i)=>{ return i.deptName==data[1]})
          }
        })
        console.log(result);
        // console.log({deptName:result.deptName,deptId:result.deptId,deptArea:data[0]});
        dispatch(setDeptInfo({deptName:result.deptName,deptId:result.deptId,deptArea:data[0],deptAreaId:result.parentId}))
        setModalVisible(false)
        if(selectedMenu){
          jump(selectedMenu)
        }

      },
      onPickerCancel: data => {
        console.log('picker cancel:', data);
        setModalVisible(false)
      },
      onPickerSelect: data => {
        // console.log('picker select:', data);
      },
    });
    Picker.show();
  };
  let testItem=[
    {name:"市场",
      list:[
        {"name":"录音上传",img:require('@/assets/ic_home/lysc-icon.png'), path:'home'},
        {"name":"今日建档",img:require('@/assets/ic_home/jrjd-icon.png'), path:"webViewPage?/marketHouse/patient" },
        {"name":"表单分配",img:require('@/assets/ic_home/bdfp-icon.png'), path:''},
        {"name":"录音管理",img:require('@/assets/ic_home/lygl-icon.png'), path:''},
        {"name":"建设中",img:require('@/assets/ic_home/jsz-icon.png'), path:'smartcamera'},
      ]}
  ]





  //doRefresh();
  //const user = useSelector(getUser);
  const dispatch = useDispatch();

  const onPress = (item) => {
    console.log('on press',item);
    if(!item.groupCadrePermission){
      if(!dept.deptName){
        setModalVisible(true)
        setSelectedMenu(item)
        return
      }
    }
    jump(item)
  }
  const jump=(item)=>{

    let path = item.path;
    if (path.length > 0) {
      if (path.indexOf('?')>=0){
        let paths= path.split("?")
        navigation.push(paths[0],{webUrl:paths[1]})
      }else {
        navigation.push(path,item.params)
      }
      // navigation.push(path);

    }
  }
  const logoutHandle = ()=>{
    console.log(1111);
    dispatch(logout());
    navigation.push('login')
    // setTimeout(() => {
    //
    // },1);
    // dispatch(logout());
    // navigation.navigate('login')
    // navigation.push('login')
    // navigation.push('login')

  }
  const renderItem = ({ item,index, separators }) => (
    <View key={item.pmenuId} style={{backgroundColor:'#fff',borderRadius:theme.DpWidth(12),padding:theme.DpWidth(40),marginBottom:theme.DpHeight(32),width:'100%'}}>
      <TextFix style={{fontSize:theme.fontSize32,color:theme.colorForNormalText}}>{item.name}</TextFix>
      <View  style={{alignItems:'center',flexDirection:'row',flex:1,flexWrap:'wrap',marginTop:theme.DpHeight(24),width:'100%'}}>
        {
          renderChild(item.details)
        }
      </View>

    </View>
  );
  const renderChild=(child)=>{
    if(!child){
      return ''
    }
    return  child.map((item)=>{
      return (

        <TouchableOpacity onPress={()=> {onPress(item)}} key={item.menuId} style={{display:"flex",alignItems:'center',width:"33.3%",marginTop:theme.DpHeight(48)}}>

          <View style={{width:theme.DpWidth(72),height:theme.DpWidth(72)}}>
            {/*<Image source={require(item.iconPath)} style={{width:theme.DpWidth(72),height:theme.DpWidth(72), resizeMode:'contain'}} />*/}
            <Image source={{uri:item.iconPath}} style={{width:theme.DpWidth(72),height:theme.DpWidth(72), resizeMode:'contain'}} />

          </View>
          <View style={{marginTop:theme.DpHeight(20)}}><TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormalText}}>{item.menuName}</TextFix></View>
        </TouchableOpacity>

      )
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar  backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <Modal
        transparent={true}
        onShow={showPicker}
        visible={modalVisible}
        style={{flex:1}}
        onDismiss={()=>{
          setModalVisible(false)
          Picker.hide();
        }}
        onRequestClose={() => {}}>
        <View style={{flex:1,backgroundColor:'#000',opacity:0.3,height:"100%",width:"100%",position:"absolute"}}></View>
      </Modal>
      <View style={{display:"flex",justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:theme.DpHeight(100),paddingHorizontal:theme.DpWidth(16)}}>
        <TouchableOpacity onPress={()=>{ if(!deptList||deptList.length<=0){return}setModalVisible(true)}} hitSlop={{top: 50, bottom: 10, left: 50, right: 50}}>
          <View style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:"row"}}>
            <Image style={{width: theme.DpWidth(44), height: theme.DpWidth(44), marginRight: theme.DpWidth(16)}} source={require('@/assets/ic_home/logo.png')} mode="aspectFill"></Image>

            <TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormalText}}>{dept.deptName?dept.deptArea+'·'+dept.deptName:'咿呀英博集团'}</TextFix>
            <Image style={{width: theme.DpWidth(28), height: theme.DpWidth(28), marginRight: theme.DpWidth(16)}} source={require('@/assets/ic_home/zk-icon.png')} mode="aspectFill"></Image>

          </View>

        </TouchableOpacity>
        <View style={{display:"flex",justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
          <TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormalText}}>{user?user.userName:''}</TextFix>
          <TextFix style={{marginLeft:theme.DpWidth(32),marginRight:theme.DpWidth(32),color:'#DADBDD'}} >｜</TextFix>
          <TouchableOpacity  onPress={logoutHandle}>
            <TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormal2Text}}>退出</TextFix>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{flex:1,...theme.commonPadding,marginTop:theme.DpHeight(32),width:'100%'}}>
        <FlatList
          data={menus}
          renderItem={renderItem}
          keyExtractor={item => item.pmenuId}
          horizontal={false}
          numColumns = {1}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    backgroundColor:'#d7def6'
  },
  item_text:{
    color:"#333"
  },
  background: {

  },

});
