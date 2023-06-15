import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  PanResponder,
} from 'react-native';

const cardHeight = 144;
const cardTitle = 45;
const cardPadding = 10;

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const cards = [
  {
    name: 'Shot',
    color: '#a9d0b6',
    price: '30 CHF',
  },
  {
    name: 'Juice',
    color: '#e9bbd1',
    price: '64 CHF',
  },
  {
    name: 'Mighty Juice',
    color: '#eba65c',
    price: '80 CHF',
  },
  {
    name: 'Sandwich',
    color: '#95c3e4',
    price: '85 CHF',
  },
  {
    name: 'Combi',
    color: '#1c1c1c',
    price: '145 CHF',
  },
  {
    name: 'Signature',
    color: '#a390bc',
    price: '92 CHF',
  },
  {
    name: 'Coffee',
    color: '#fef2a0',
    price: '47 CHF',
  },
];

const Wallet: React.FC = () => {
  const y = useRef(new Animated.Value(0)).current;
  const AnimateTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const handleCardPress = (cardName: string) => {
    console.log('Clicou no card', cardName);
  };
  const renderCards = () => {
    return cards.map((card, i) => {
      const inputRange = [-cardHeight, 0];
      const outputRange = [cardHeight * i, (cardHeight - cardTitle) * -i];
      if (i > 0) {
        inputRange.push(cardPadding * i);
        outputRange.push((cardHeight - cardPadding) * -i);
      }
      const translateY = y.interpolate({
        inputRange,
        outputRange,
        extrapolateRight: 'clamp',
      });

      return (
        <Animated.View
          key={card.name}
          style={[
            styles.cardContainer,
            {
              width: width - 40,
              transform: [{translateY}],
            },
          ]}>
          <AnimateTouchable onPress={() => handleCardPress(card.name)}>
            <View style={[styles.card, {backgroundColor: card.color}]} />
          </AnimateTouchable>
        </Animated.View>
      );
    });
  };

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y},
        },
      },
    ],
    {useNativeDriver: true},
  );

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>{renderCards()}</View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
    justifyContent: 'center',
  },
  content: {
    height: height * 2,
  },
  cardContainer: {},
  card: {
    height: cardHeight,
    borderRadius: 10,
  },
});

export default Wallet;
