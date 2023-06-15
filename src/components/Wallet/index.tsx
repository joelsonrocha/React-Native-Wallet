import React, {useRef} from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {cardsState} from '../../store/cards/cardSlice';
import CreditCard from '../CreditCard';

const cardHeight = 190;
const cardTitle = 80;
const cardPadding = 10;

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const Wallet: React.FC = () => {
  const cards = useSelector(cardsState);
  const y = useRef(new Animated.Value(0)).current;
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
          key={card.id}
          style={[
            styles.cardContainer,
            {
              width: width - 40,
              transform: [{translateY}],
            },
          ]}>
          <CreditCard card={card} />
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
  cardContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
  },
});

export default Wallet;
