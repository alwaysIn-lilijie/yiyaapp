import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import {MainNavigator} from '@/navigation/MainNavigator';

import { theme } from '@/theme';

export function RootNavigator() {
  const user =  useSelector((state) => state.login.user);
  const selectCount =  useSelector((state) => state.login.selectCount);
  console.log('88888888888888',selectCount);
  console.log('88888888888888',user);
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={theme[scheme]}>

      {/*{user?( selectCount ? <MainNavigator />  : <SelectCountNavigator/>):<AuthNavigator />}*/}
      {user? <MainNavigator />:<AuthNavigator />}

    </NavigationContainer>
  );
}
