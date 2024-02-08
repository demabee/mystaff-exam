import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomDrawer from './src/components/Drawer';
import { NavContext } from './src/context';
import { useEffect, useState } from 'react';
import UIExam from './src/screens/UIExam';
import NativeModuleExam from './src/screens/NativeModuleExam';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('UIExam');

  const navigateToScreen = screenName => {
    setCurrentScreen(screenName);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'UIExam':
        return <UIExam />;
      case 'NativeModuleExam':
        return <NativeModuleExam />;
      default:
        return null;
    }
  };

  useEffect(() => {}, [currentScreen]);

  return (
    <NavContext.Provider value={{ navigateToScreen }}>
      <StatusBar style="auto" />
      <CustomDrawer currentScreen={currentScreen}>
        {renderScreen()}
      </CustomDrawer>
    </NavContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
