/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import theme from '../../global/theme';
import topography from '../../global/typography';

type ButtonProps = {
  typeButton: string;
  textButton: string;
};

function CustomButton({typeButton, textButton}: ButtonProps): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <TouchableOpacity style={[styles.container, styles[typeButton]]}>
      <Text style={[topography.h5, styles[typeButton], styles.text]}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  primary: {
    backgroundColor: theme.baseColor.blueLight,
    color: theme.textColor.white,
  },
  secondary: {
    backgroundColor: theme.baseColor.greenLight,
    color: theme.baseColor.blueDark,
  },
  text: {
    backgroundColor: 'transparent',
  },
});

export default CustomButton;
