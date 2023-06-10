/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import topography from '../../global/typography';
import theme from '../../global/theme';
import CustomHeaderFat from '../../components/CustomHeaderFat';
import {getCardService} from '../../services';
import {useNavigation} from '@react-navigation/native';
import CreditCard from '../../components/CreditCard';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function MyCards(): JSX.Element {
  /* const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current; */
  const [cards, setCards] = useState<CardData[]>([]);
  const navigation = useNavigation();
  const getCards = useCallback(async () => {
    try {
      const result = await getCardService.getCards();
      setCards(result);
      console.log('cartões carregados', result);
    } catch (error) {
      console.log('Erro ao buscar cartões', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCards();
    });
    return unsubscribe;
  }, [navigation, getCards]);

  /* useEffect(() => {
    console.log('cards com interface', cards);
    cards.map(item => {
      console.log('cards com interface item', item);
    });
  }, [cards]); */

  const onPanGestureEvent = event => {
    // Manipular eventos de gesto de pan
    console.log('Pan gesture event:', event.nativeEvent);
  };

  const onPanHandlerStateChange = event => {
    // Manipular alterações de estado do gesto de pan
    console.log('Pan gesture state change:', event.nativeEvent);
  };

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <CustomHeaderFat title="Wallet Test" subtitle="Meus cartões" />
      <View style={styles.body}>
        {/* <GestureHandlerRootView style={{flex: 1}}>
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}>
            <View style={styles.wallet}>
              {cards.map(card => (
                <CreditCard
                  key={card.id}
                  cardNumber={card.number}
                  personName={card.name}
                  validate={`Validade ${card.validate}`}
                />
              ))}
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView> */}
        {/* <AnimatedFlatList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          data={cards}
          renderItem={({item}) => (
            <CreditCard
              key={item.id}
              cardNumber={item.number}
              personName={item.name}
              validate={`Validade ${item.validate}`}
            />
          )}
          keyExtractor={card => card.id}
          initialNumToRender={1}
          bounces={false}
          {...{onScroll}}
        /> */}
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'green',
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subtitle: {
    color: theme.baseColor.greenLight,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  wallet: {},
});

export default MyCards;
