import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NativeModuleExam = () => {
  return (
    <View style={styles.container}>
      <Text>NativeModuleExam</Text>
    </View>
  );
};

export default NativeModuleExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
