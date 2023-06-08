import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import theme from './theme';

type BaseScreenProps = PropsWithChildren<{
  children: React.ReactNode;
}>;

const BaseScreen = ({children}: BaseScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.elementBackgroundUp} />
      {children}
      <View style={styles.elementBackgroundDown} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    position: 'relative',
  },
  elementBackgroundUp: {
    backgroundColor: theme.baseColor.greyLight,
    position: 'absolute',
    width: 349.21,
    height: 235.27,
    top: -90,
    left: -90,
    opacity: 0.2,
    zIndex: 1,
    borderRadius: 50,
    transform: [{rotate: '145deg'}],
  },
  elementBackgroundDown: {
    backgroundColor: theme.baseColor.greyLight,
    position: 'absolute',
    width: 349.21,
    height: 235.27,
    bottom: -90,
    right: -90,
    opacity: 0.2,
    zIndex: 1,
    borderRadius: 50,
    transform: [{rotate: '145deg'}],
  },
});

export default BaseScreen;
