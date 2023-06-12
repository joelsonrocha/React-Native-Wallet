import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import CreditCard from '../CreditCard';

const cardHeight = 180;
const cardTitle = 155;
const cardPadding = 20;

const {height} = Dimensions.get('window');
type WalletProps = {
  cards: CardData[];
};

const Wallet = ({cards}: WalletProps) => {
  const y = useRef(new Animated.Value(0)).current;

  const onClickCard = (card: CardData, index: number) => {
    console.log('onClickCard', card, index);

    /* const cardIndex = cards.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      const newCards = [...cards];
      const selectedCard = newCards.splice(cardIndex, 1)[0];
      newCards.unshift(selectedCard);
      // Atualize o estado do componente com as novas posições dos cards
      // setState ou useState para atualizar o estado
    } */
  };
  const renderCards = () => {
    return cards.map((card, index) => {
      const inputRange = [-cardHeight, 0];
      const outputRange = [
        cardHeight * index,
        (cardHeight - cardTitle) * -index,
      ];
      if (index > 0) {
        inputRange.push(cardPadding * index);
        outputRange.push((cardHeight - cardPadding) * -index);
      }
      const translateY = y.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={card.id}
          style={[{transform: [{translateY}]}, styles.cardContent]}>
          <TouchableOpacity
            onPress={() => onClickCard(card, index)}
            style={styles.touchCard}>
            <CreditCard
              cardNumber={card.number}
              validate={card.validate}
              personName={card.name}
              typeCard={card.typeCard}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    y.setValue(scrollY);
  };

  return (
    <View style={styles.container}>
      <View style={styles.absoluteFill}>{renderCards()}</View>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCard: {},
  content: {
    height: height * 2,
  },
});

export default Wallet;
