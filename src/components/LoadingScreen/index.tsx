import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated, Dimensions} from 'react-native';
import theme from '../../global/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoadingScreen = () => {
  const translateUpValue = useRef(
    new Animated.ValueXY({x: -90, y: -90}),
  ).current;
  const translateDownValue = useRef(
    new Animated.ValueXY({x: -90, y: -90}),
  ).current;
  const rotateAnimatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnimatedValue = useRef(new Animated.Value(1)).current;

  const animateView = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(translateUpValue, {
          toValue: {x: 35, y: 35},
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateUpValue, {
          toValue: {x: -90, y: -90},
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(translateDownValue, {
          toValue: {x: -90, y: -90},
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateDownValue, {
          toValue: {x: 0, y: 0},
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scaleAnimatedValue, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnimatedValue, {
        toValue: 145,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        animateView(); // Reinicia a animação quando terminar
      }
    });
  }, [
    rotateAnimatedValue,
    scaleAnimatedValue,
    translateDownValue,
    translateUpValue,
  ]);

  useEffect(() => {
    animateView();
  }, [animateView]);

  const interpolatedRotate = rotateAnimatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const animatedImage = {
    transform: [{scaleX: scaleAnimatedValue}, {scaleY: scaleAnimatedValue}],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.elementBackgroundUp,
          {
            transform: [
              {translateX: translateUpValue.x},
              {translateY: translateUpValue.y},
              {rotate: interpolatedRotate},
            ],
          },
        ]}
      />
      <View style={styles.center}>
        <Animated.View style={[styles.iconContainer, animatedImage]}>
          <Image
            source={require('../../assets/icon.png')}
            style={[styles.icon]}
          />
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.elementBackgroundDown,
          {
            transform: [
              {translateX: translateDownValue.x},
              {translateY: translateDownValue.y},
              {rotate: interpolatedRotate},
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: theme.baseColor.blueDark,
    position: 'relative',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    resizeMode: 'contain',
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

export default LoadingScreen;
