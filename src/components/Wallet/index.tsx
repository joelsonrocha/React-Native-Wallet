import React, {useRef, useState} from 'react';
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
import CustomScrollView from '../CustomScrollView';
import {Text} from 'react-native-svg';

const cardHeight = 180;
const cardTitle = 155;
const cardPadding = 20;

const {height} = Dimensions.get('window');
type WalletProps = {
  cards: CardData[];
};

const Wallet = ({cards}: WalletProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const y = useRef(new Animated.Value(0)).current;
  let lastOffsetY: number;
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
          {/* <TouchableOpacity
            style={[styles.touchCard, StyleSheet.absoluteFill]}
            onPress={() => handleCardPress(card)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} // Define o hit slop para expandir a área de toque
          /> */}
          <CreditCard card={card} />
        </Animated.View>
      );
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollY = contentOffset.y;
    y.setValue(scrollY);
    const CONTAINER_HEIGHT = 400;
    console.log('layoutMeasurement.height', layoutMeasurement.height);
    console.log('contentOffset.y', contentOffset.y);
    console.log('contentSize.height', contentSize.height);
    const {x: offsetX, y: offsetY} = contentOffset;

    if (offsetY < lastOffsetY) {
      // Arrastando para baixo
      console.log('Arrastando para baixo');
      setScrollEnabled(true);
    } else if (offsetY < lastOffsetY) {
      // Arrastando para cima
      console.log('Arrastando para cima');
      //if (contentOffset.y >= 76) {
      setScrollEnabled(false);
      /* } else {
        setScrollEnabled(true);
      } */
    }

    // Atualize a última posição do scroll
    lastOffsetY = offsetY;

    /* if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - CONTAINER_HEIGHT
    ) {
      // O usuário chegou ao final dos itens
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    } */
  };

  const handleScroll2 = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = event.nativeEvent;
    const scrollY = contentOffset.y;
    y.setValue(scrollY);

    if (contentOffset.y >= 70) {
      //setScrollEnabled(false);
      console.log('Arrastando para cima');
    } else if (contentOffset.y < 0) {
      //setScrollEnabled(true);
      console.log('Arrastando para cima');
    }
  };

  const handleScrollBeginDrag = () => {
    console.log('handleScrollBeginDrag');
    if (reachedEnd) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  };

  const handleScrollEndDrag = () => {
    console.log('handleScrollEndDrag');
    if (reachedEnd) {
      setScrollEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={isScrollEnabled}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        onScroll={handleScroll2}>
        <View style={styles.absoluteFill}>{renderCards()}</View>
      </ScrollView>
      {!isScrollEnabled && (
        <View style={styles.expandButton}>
          <TouchableOpacity onPress={() => setScrollEnabled(true)}>
            <Text>texto do botão</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <CustomScrollView>{renderCards()}</CustomScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    position: 'relative',
  },
  expandButton: {
    position: 'absolute',
    bottom: 10,
    zIndex: 999,
    width: 100,
    height: 60,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCard: {},
  content: {
    height: height * 2,
    paddingTop: 16,
    paddingBottom: 0,
  },
});

export default Wallet;
