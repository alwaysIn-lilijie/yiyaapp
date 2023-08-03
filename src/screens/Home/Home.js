import { useTheme, useNavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { Image} from 'react-native';
import { FlatList,StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '@/screens/Home/Home.styles';
// import { logout } from '@/actions/UserActions';
import {logout} from '@/reducers/LoginReducer';
import {recordService} from '@/service'
import {useMount, useUnmount} from 'react-use';
import { tableInit } from '@/reducers/PictureReducer';
import TextFix from '@/components/TextFix';
import { theme } from '@/theme/theme';
import RNPickerSelect from 'react-native-picker-select';
import DeptList from '@/components/DeptList';

export function Home({ navigation }) {
  const { colors } = useTheme();
  const user = useSelector((state) => state.login.user);
  const fileList = useSelector((state)=> state.record.fileList);

  const [items, setItems] = React.useState([
    {
      id: 'market',
      title: '市场建档',
      itemText: '建档人数',
      itemCount: 0,
      img: require('@/assets/images/jiandang.png'),
      path:''
    },
    {
      id: 'record-upload',
      title: '录音上传',
      itemText: '待上传',
      itemCount: '0',
      img: require('@/assets/images/luyin.png'),
      path:'record'
    },
    {
      id: 'smartcamera',
      title: '照片上传',
      itemText: '待上传',
      itemCount: 0,
      img: require('@/assets/images/paizhao.png'),
      path:'smartcamera'
    },
    {
      id: 'market-call',
      title: '回访查询',
      itemText: '待回访',
      itemCount: 0,
      img: require('@/assets/images/huifang.png'),
      path:''
    },
  ]);
  // useEffect(() => {
  //   items.forEach(item  => {
  //     if (item.id == 'record-upload') {
  //       item.itemCount = fileList?.length;
  //     }
  //   })
  // }, [fileList]);

  const getItemCount = (item) => {
    if (item.id == 'record-upload') {
      return fileList?.length;
    }
    return 0;
  }
  const doRefresh =  ()=>{
     recordService.scan();
  }
  useMount(()=>{
    console.log('home mount--------------');
    doRefresh();
  });
  //doRefresh();
  //const user = useSelector(getUser);
  const dispatch = useDispatch();
  dispatch(tableInit())
  const onPress = (item) => {
    console.log('on press',item);

    let path = item.path;
    if (path.length > 0) {
      navigation.navigate(path);
    }
  }
  const logoutHandle = ()=>{
    navigation.navigate('mainPage');
  }
  const renderItem = ({ item,index, separators }) => (
    <TouchableOpacity style={styles.item} onPress={()=> {onPress(item)}}>
      <View style={styles.item_title}>
        <TextFix style={styles.item_text} >{item.title}</TextFix>
      </View>
      <View style={{paddingTop: 100, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingLeft:0}}>
            <View>
              <TextFix style={{fontSize: theme.fontSize28, color: 'rgba(0, 0, 0, 1)', fontWeight:'bold', fontFamily:'Arial, Helvetica, sans-serif'}}>
                {getItemCount(item)}
              </TextFix>
              <View style={{marginTop:5}}>
                <TextFix style={{fontSize: theme.fontSize28, color: '#999999', fontWeight:'blod', fontFamily:'Arial, Helvetica, sans-serif'}}>{item.itemText}</TextFix>
               </View>
            </View>
          </View>
          <View style={{marginLeft:15, paddingRight:0}}>

            <Image source={item.img} style={{width:50,height:50, resizeMode:'contain'}} />
          </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <StatusBar  backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <LinearGradient colors={[ '#E7EEFE','#F9FAFE']}  style={{height:theme.DpHeight(140),width:theme.screenWidth,...theme.commonPadding}}>
        <View style={{display:"flex",justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:theme.DpHeight(68)}}>
          <TextFix style={{fontSize: theme.fontSize28,color:theme.colorForNormalText}}>Hi，{user.userName}~ </TextFix>
          <TouchableOpacity onPress={logoutHandle}>
            {/*<Image style={{width: 23, height: 23, marginTop: 8}} source={require('@/assets/images/out.png')} mode="aspectFill"></Image>*/}
            <TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormal3Text}}>回到首页</TextFix>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/*<LinearGradient colors={['#d7def6', '#f5f5f5']} style={styles.background}/>*/}
        {/*<View style={{marginTop: 34,marginBottom: 10}}>*/}
        {/*  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>*/}
        {/*    <View style={{paddingLeft: 20}}>*/}
        {/*        <View>*/}
        {/*          <TextFix style={{fontSize: theme.fontSize28,color:theme.colorForNormalText}}>Hi~ {user.userName}</TextFix>*/}
        {/*        </View>*/}
        {/*        /!*<View style={{marginTop: 10}}>*!/*/}
        {/*        /!*  <Text style={{fontSize: 12, color: '#8899b3', fontWeight:'600'}}>{user.sysDept.deptName}</Text>*!/*/}
        {/*        /!*</View>*!/*/}
        {/*    </View>*/}
        {/*    <View style={{paddingRight:15}}>*/}
        {/*      <TouchableOpacity onPress={logoutHandle}>*/}
        {/*        /!*<Image style={{width: 23, height: 23, marginTop: 8}} source={require('@/assets/images/out.png')} mode="aspectFill"></Image>*!/*/}
        {/*        <TextFix style={{fontSize:theme.fontSize28,color:theme.colorForNormal3Text}}>回到首页</TextFix>*/}
        {/*      </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
      <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',flexWrap:'wrap',display:'flex'}}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns = {2}
        />
      </View>


    </View>
  );
}
