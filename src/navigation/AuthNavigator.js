import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login ,MainPage} from '@/screens';
import { NAVIGATION } from '@/constants';
const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen component={Login} name={"login"} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
