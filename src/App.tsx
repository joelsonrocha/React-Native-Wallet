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

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome VR Wallet</Text>
        <Text style={[topography.h1, styles.subtitle]}>H1</Text>
        <Text style={[topography.h2, styles.subtitle]}>H2</Text>
        <Text style={[topography.h3, styles.subtitle]}>H3</Text>
        <Text style={[topography.h4, styles.subtitle]}>H4</Text>
        <Text style={[topography.h5, styles.subtitle]}>H5</Text>
        <Text style={[topography.paragraph, styles.subtitle]}>Paragraph</Text>
        <Text style={[topography.small, styles.subtitle]}>Small</Text>
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
    color: theme.baseColor.blueLight,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  subtitle: {
    color: theme.baseColor.greenLight,
  },
});

export default App;
