import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION } from '@/constants';
import { Home, Profile,MainPage } from '@/screens';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name={NAVIGATION.main} component={MainPage} options={{headerShown:false}} />
      <Stack.Screen name={NAVIGATION.home} component={Home} />
      <Stack.Screen name={NAVIGATION.profile} component={Profile} />
    </Stack.Navigator>
  );
}
