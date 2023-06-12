import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../global/theme';
import CustomHeaderFat from '../../components/CustomHeaderFat';
import {getCardService} from '../../services';
import {useNavigation} from '@react-navigation/native';
import CreditCard from '../../components/CreditCard';
import topography from '../../global/typography';
import CustomButton from '../../components/CustomButton';
import Wallet from '../../components/Wallet';

const cardHeight = 180;
const cardTitle = 155;
const cardPadding = 20;

const {height} = Dimensions.get('window');

function MyCards(): JSX.Element {
  const y = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardToUse, setCardToUse] = useState<CardData>();
  const [selectedCard, setSelectedCard] = useState<CardData>();
  const navigation = useNavigation();
  const getCards = useCallback(async () => {
    try {
      const result = await getCardService.getCards();
      setCards(result);
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

  const prepareCardToUse = useCallback(() => {
    if (cards.length) {
      setCardToUse(cards[cards.length - 1]);
    }
  }, [cards]);

  useEffect(() => {
    prepareCardToUse();
  }, [cards, prepareCardToUse]);

  const cardChoose = (item: CardData, index: number): void => {
    console.log('cardChoose', item, index);
    const arrayCard = cards;
    const indexInFront = cards.length - 1;
    if (index === indexInFront) {
      return;
    }
    const cardFront = arrayCard[indexInFront];
    console.log('index clicado', index);
    console.log('escolhi o cartão', item);
    console.log('cardFront', cardFront);
    arrayCard[indexInFront] = item;
    arrayCard[index] = cardFront;
    setCards([...arrayCard]);
  };

  const backMyCards = () => {
    setSelectedCard(undefined);
  };

  const handleEmpty = () => {
    return <Text style={styles.title}> Nenhum cartão cadastrado!</Text>;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderRelease: (_evt, gestureState) => {
      const {dx, moveY, y0} = gestureState;
      console.log('arrastada dx', dx);
      console.log('arrastada moveY', moveY);
      console.log('arrastada moveY0', y0);
      /* if (dx > SWIPE_THRESHOLD) {
        onSwipeRight();
      }
      if (dx < -SWIPE_THRESHOLD) {
        onSwipeLeft();
      } */
      // If needed, could add up and down swipes here with `gestureState.dy`
    },
  });

  const squares = ['green', 'red', 'blue', 'purple'];
  const renderStack = () => {
    const top = 30;
    const bottom = 100;

    return (
      <View style={styles.containerStack}>
        {squares.map((item: string, index: number) => {
          const itemStyle = {
            zIndex: index,
            top: top,
            backgroundColor: item,
          };
          const inputRange = [top, bottom];
          const outputRange = [70 * index, 70 * -index];
          const translateY = posY.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={item}
              style={[{transform: [{translateY}]}, styles.square, itemStyle]}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = (item: CardData, index: number) => {
    const zIndex = cards.length + index;
    const bottom = index * 144;
    const itemStyle = {
      zIndex: zIndex,
      bottom: bottom,
    };
    const inputRange = [-cardHeight, 0];
    const outputRange = [cardHeight * index, (cardHeight - cardTitle) * -index];
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
      <Animated.View key={item.id} style={[{transform: [{translateY}]}]}>
        <TouchableOpacity onPress={() => cardChoose(item, index)}>
          <CreditCard
            cardNumber={item.number}
            validate={item.validate}
            personName={item.name}
            typeCard={item.typeCard}
            itemStyle={itemStyle}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderFat
        title="Wallet Test"
        subtitle="Meus cartões"
        onClick={async () => backMyCards()}
      />
      <View style={styles.body}>
        {selectedCard && (
          <View>
            <CreditCard
              cardNumber={selectedCard.number}
              validate={selectedCard.validate}
              personName={selectedCard.name}
              typeCard={selectedCard.typeCard}
            />
            <CustomButton
              typeButton="primary"
              textButton="pagar com este cartão"
              onClick={async () => {
                console.log('pagou!!');
              }}
            />
          </View>
        )}
        {renderStack()}
        {/*{selectedCard && (
          <View>
            <CreditCard
              cardNumber={selectedCard.number}
              validate={selectedCard.validate}
              personName={selectedCard.name}
              typeCard={selectedCard.typeCard}
            />
            <CustomButton
              typeButton="primary"
              textButton="pagar com este cartão"
              onClick={async () => {
                console.log('pagou!!');
              }}
            />
          </View>
        )}
         <View style={styles.cardContainer}>
          <Wallet cards={cards} />
        </View>
        <View style={styles.useCardArea}>
          <TouchableOpacity
            onPress={() => {
              setSelectedCard(cardToUse);
            }}>
            <Text style={[topography.paragraph, styles.textUseCard]}>
              Usar este cartão
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.cardContainer}>
          <FlatList
            data={cards}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(data, index) => ({
              length: cardHeight,
              offset: cardHeight * index,
              index,
            })}
            initialNumToRender={10}
            ListEmptyComponent={handleEmpty}
          />
        </View>
        {/* <View style={styles.cardContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            {cards.map((item, index) => {
              const zIndex = cards.length + index;
              const bottom = index * 144;
              const itemStyle = {
                zIndex: zIndex,
                bottom: bottom,
              };
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => cardChoose(item, index)}>
                  <CreditCard
                    cardNumber={item.number}
                    validate={item.validate}
                    personName={item.name}
                    typeCard={item.typeCard}
                    itemStyle={itemStyle}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.useCardArea}>
            <TouchableOpacity
              onPress={() => {
                setSelectedCard(cardToUse);
              }}>
              <Text style={[topography.paragraph, styles.textUseCard]}>
                Usar este cartão
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
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
  cardContainer: {
    marginTop: 50,
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    padding: 20,
  },
  useCardArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  textUseCard: {
    color: theme.textColor.white,
  },
  containerStack: {
    margin: 20,
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'linen',
  },
  square: {
    height: 180,
    width: 300,
    position: 'absolute',
    left: 0,
  },
});

export default MyCards;
