/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
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
function MyCards(): JSX.Element {
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardToUse, setCardToUse] = useState<CardData>();
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

  const cardChoose = (item: CardData, index: number) => {
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

  return (
    <View style={styles.container}>
      <CustomHeaderFat title="Wallet Test" subtitle="Meus cartões" />
      <View style={styles.body}>
        <View style={styles.cardContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewCards}
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
                    itemStyle={itemStyle}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.useCardArea}>
            <TouchableOpacity
              onPress={() => {
                console.log('usar este cartão', cardToUse);
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
  cardContainer: {marginTop: 50, height: 400},
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
});

export default MyCards;
