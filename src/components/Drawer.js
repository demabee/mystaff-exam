import React, { useRef } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCustomNavigation } from '../context';

const CustomDrawer = ({ children, currentScreen }) => {
  const { navigateToScreen } = useCustomNavigation();
  const drawerTranslateX = useRef(new Animated.Value(-300)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < 0) {
          drawerTranslateX.setValue(dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < -50) {
          closeDrawer();
        } else {
          openDrawer();
        }
      },
    }),
  ).current;

  const openDrawer = () => {
    Animated.timing(drawerTranslateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerTranslateX, {
      toValue: -300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleGoToScreen = screen => {
    navigateToScreen(screen);
    closeDrawer();
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 200,
          zIndex: 1,
          backgroundColor: 'gray',
          transform: [{ translateX: drawerTranslateX }],
          paddingVertical: 50,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity style={styles.closeBurgerBtn} onPress={closeDrawer}>
          <FontAwesome name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.drawerWrapper}>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => handleGoToScreen('UIExam')}
          >
            <Text>UI Exam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => handleGoToScreen('NativeModuleExam')}
          >
            <Text>Native Module Exam</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: ' center' }}
      >
        <View style={styles.burgerBtn}>
          <TouchableOpacity onPress={openDrawer}>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 800, fontSize: 20 }}>
            {currentScreen ?? 'Text'}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  burgerBtn: {
    zIndex: 1,
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  closeBurgerBtn: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  drawerWrapper: {
    marginTop: 30,
  },
  linkContainer: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
});
