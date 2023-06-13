import React, {useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';

interface CustomScrollViewProps {
  children: React.ReactNode;
}

const CustomScrollView: React.FC<CustomScrollViewProps> = ({children}) => {
  const panY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: () => {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: 'grey'}}>
      <Animated.View
        style={{
          transform: [{translateY: panY}],
        }}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
};
export default CustomScrollView;
