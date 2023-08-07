import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { StyleSheet, PermissionsAndroid,ToastAndroid,Alert } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { networkService } from '@/networking';
import { RootNavigator } from '@/navigation';
import Toast from '@/components/Toast';
import PopUp from '@/components/Modal';
import Loading from '@/components/Loading';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default function App() {

  const handleStoreRehydration = () => {
    const login = store.getState().login;
    if (login.user) {
      const token = login.user.token;
      if (token) {
        networkService.setAccessToken(token);
      }

    }


    // RNBootSplash.hide({ fade: true })
  };

  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={handleStoreRehydration} persistor={persistor}>
        {/*<SafeAreaView style={styles.container}>*/}
        <GestureHandlerRootView style={styles.container}>
          <RootNavigator />
        </GestureHandlerRootView>
        {/*</SafeAreaView>*/}
      </PersistGate>
      <Toast />
      <PopUp />
      <Loading />
    </Provider>
  );
}
