import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

function MyCards(): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const y = useRef(new Animated.Value(0)).current;
  const [isScrollEnabled, setScrollEnabled] = useState(true);
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

  const backMyCards = () => {
    setSelectedCard(undefined);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, contentSize} = event.nativeEvent;
    const scrollY = contentOffset.y;
    y.setValue(scrollY);

    console.log('contentOffset', contentOffset);
    console.log('contentSize', contentSize.height);
    const heightTotal = cards.length * 30 + 180 - 30;
    console.log('heightTotal', heightTotal);
    if (contentOffset.y >= 70) {
      setScrollEnabled(false);
      console.log('Arrastando para baixo chegou no final');
    } else if (contentOffset.y < 0) {
      setScrollEnabled(true);
      console.log('Arrastando para baixo');
    }
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
            <CreditCard card={selectedCard} />
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
          <ScrollView
            ref={scrollViewRef}
            scrollEnabled={isScrollEnabled}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={handleScroll}>
            {cards.map((item, index) => {
              const zIndex = cards.length + index;
              const bottom = index * 150;
              console.log('card position', zIndex, bottom, cards.length);
              const itemStyle = {
                zIndex: zIndex,
                bottom: bottom,
              };
              return (
                <CreditCard key={item.id} card={item} itemStyle={itemStyle} />
              );
            })}
          </ScrollView>
          {!isScrollEnabled && (
            <View style={styles.expandButton}>
              <TouchableOpacity
                onPress={() => {
                  scrollViewRef?.current?.scrollTo({y: 0, animated: true});
                  setScrollEnabled(true);
                }}>
                <Image
                  source={require('../../assets/arrowTop.png')}
                  style={{width: 40, height: 40, borderRadius: 20}}
                />
              </TouchableOpacity>
            </View>
          )}
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
        </View>
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
  },
  expandButton: {
    position: 'absolute',
    bottom: 10,
    zIndex: 999,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    paddingBottom: 0,
  },
  useCardArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  textUseCard: {
    color: theme.textColor.white,
  },
});

export default MyCards;
