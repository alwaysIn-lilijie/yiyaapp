/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-04 09:48:36
 */
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION } from '@/constants';
import {MainPage,Login,WebViewPage } from '@/screens';


const Stack = createNativeStackNavigator();

export function MainNavigator() {
  const user =  useSelector((state) => state.login.user);

  return (
    <Stack.Navigator >
      {/*<Stack.Screen component={Login} name={"login"} options={{ headerShown: false }} />*/}
      <Stack.Screen name={NAVIGATION.mainPage} component={MainPage} options={{headerShown:false}}/>
      <Stack.Screen name={NAVIGATION.webViewPage} component={WebViewPage} options={{headerShown:false}} />



    </Stack.Navigator>
  );
}
