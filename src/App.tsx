/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import theme from './global/theme';
import topography from './global/typography';
import BaseScreen from './global/baseScreen';
import CustomButton from './components/CustomButton';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={[topography.h1, styles.title]}>Wallet Test</Text>
        <CustomButton textButton="meus cartões" typeButton="primary" />
        <CustomButton textButton="cadastrar cartão" typeButton="secondary" />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subtitle: {
    color: theme.baseColor.greenLight,
  },
});

export default App;
