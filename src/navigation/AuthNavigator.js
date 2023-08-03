import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login } from '@/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={"login"} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
