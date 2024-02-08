import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  useWindowDimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { Slider } from '@miblanchard/react-native-slider';
import * as VideoThumbnails from 'expo-video-thumbnails';

const VideoPlayer = ({ videoSource }) => {
  const { styles } = useStyle();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  const onLoad = playbackStatus => {
    if (playbackStatus.isLoaded) {
      setDuration(playbackStatus.durationMillis);
    }
  };

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoSource, {
        time: 15000,
      });
      setImage(uri);
    } catch (e) {
      console.warn('h', e);
    }
  };

  const seek = value => {
    video.current.playFromPositionAsync(value);
    setCurrentTimestamp(value);
  };

  useEffect(() => {
    if (image === '' || image === null) {
      generateThumbnail();
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        // style={styles.video}
        onLoad={onLoad}
        source={{
          uri: videoSource,
        }}
        videoStyle={styles.video}
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
        onPlaybackStatusUpdate={status => {
          setStatus(() => status);
          setCurrentTimestamp(status.positionMillis);
        }}
      >
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            <FontAwesome
              name={`${status.isPlaying ? 'pause' : 'play'}`}
              color="black"
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.controlsContainer}></View>
      </Video>
      <View style={styles.sliderContainer}>
        <Image source={{ uri: image }} style={styles.imageBackground} />
        <Slider
          containerStyle={{
            position: 'absolute',
            top: 20,
          }}
          value={currentTimestamp ?? 0}
          trackStyle={styles.trackStyle}
          minimumTrackTintColor="rgba(0, 90, 156, 0.5)"
          maximumTrackTintColor="transparent"
          minimumValue={0}
          maximumValue={duration ?? 0}
          trackClickable
          onValueChange={value => seek(value[0])}
          thumbTintColor="blue"
          thumbStyle={{ width: 10, height: 100, borderRadius: 0 }}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;

const useStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    controlsContainer: {},
    buttons: {
      position: 'absolute',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    sliderContainer: {
      marginTop: 20,
    },
    video: {
      position: 'relative',
      width: width ?? 400 * 0.98,
      height: 200,
    },
    slider: {
      width: 100,
      height: 100,
    },
    trackStyle: {
      height: 100,
      width: width ?? 400 * 0.97,
    },
    imageBackground: {
      // flex: 1,
      // resizeMode: 'contain',
      top: -10,
      height: 100,
    },
  });

  return { styles };
};
