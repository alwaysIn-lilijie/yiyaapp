import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';

import { Image, Modal, StyleSheet } from 'react-native';
import { FlatList,StatusBar, Text, View, TouchableOpacity,AppState } from 'react-native';

import TextFix from '@/components/TextFix'


export function MainPage({ navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar  backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <TextFix>12</TextFix>

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
