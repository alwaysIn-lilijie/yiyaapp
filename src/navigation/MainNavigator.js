/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-04 09:48:36
 */
import { useTheme } from '@react-navigation/native';
// import { TabBarIcon } from '@/components';
// import { HomeNavigator } from '@/navigation/HomeNavigator';
// import { ProfileNavigator } from '@/navigation/ProfileNavigator';
// import { TABS } from '@/constants/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION } from '@/constants';
import {MainPage
} from '@/screens';


const Stack = createNativeStackNavigator();

export function MainNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={{
      cardShadowEnabled:true,
      cardOverlayEnabled:true,
      headerStyle: {
        backgroundColor: '#d7def6',
        fontSize: 36
      },
    }}>
      <Stack.Screen name={NAVIGATION.mainPage} component={MainPage} options={{headerShown:false}}/>
      {/*/!*<Stack.Screen name={NAVIGATION.selectCount} component={SelectCount} options={{headerShown:false}}/>*!/*/}
      {/*<Stack.Screen name={NAVIGATION.home} component={Home} options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.record} component={Record} options={{headerShown:true}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.smartcamera} component={SmartCamera}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.clinicimage} component={ClinicImage}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.myimage} component={MyImage}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.imageupload} component={ImageUpload}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.neatenupload} component={NeatenUpload}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.imageimport} component={ImageImport}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.search} component={Search}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.todaypatientlist} component={TodayPatientList}  options={{headerShown:false}}/>*/}
      {/*<Stack.Screen name={NAVIGATION.patientproject} component={PatientProject} options={{headerShown:false}} />*/}
      {/*<Stack.Screen name={NAVIGATION.patientimg} component={PatientImg} options={{headerShown:false}} />*/}
      {/*<Stack.Screen name={NAVIGATION.chooseDir} component={ChooseDir} options={{headerShown:false}} />*/}
      {/*<Stack.Screen name={NAVIGATION.webViewPage} component={WebViewPage} options={{headerShown:false}} />*/}
    </Stack.Navigator>
  );
}
