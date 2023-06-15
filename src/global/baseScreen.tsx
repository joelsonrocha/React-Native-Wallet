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
      <View style={styles.contentContainer}>{children}</View>
      <View style={styles.elementBackgroundDown} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    position: 'relative',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    zIndex: 999,
  },
  elementBackgroundUp: {
    position: 'absolute',
    backgroundColor: theme.baseColor.greyLight,
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
    position: 'absolute',
    backgroundColor: theme.baseColor.greyLight,
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
