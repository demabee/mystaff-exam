import { StyleSheet, Text, View, DrawerLayoutIOS } from 'react-native';
import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';

const UIExam = () => {
  return (
    <View style={styles.container}>
      <VideoPlayer
        videoSource={'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}
      />
    </View>
  );
};

export default UIExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
