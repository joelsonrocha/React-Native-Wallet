/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import topography from '../../global/typography';
import theme from '../../global/theme';
import CustomHeaderFat from '../../components/CustomHeaderFat';
import {getCardService} from '../../services';
import {useNavigation} from '@react-navigation/native';
function MyCards(): JSX.Element {
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

  useEffect(() => {
    console.log('cards com interface', cards);
    cards.map(item => {
      console.log('cards com interface item', item);
    });
  }, [cards]);

  return (
    <View style={styles.container}>
      <CustomHeaderFat title="Wallet Test" subtitle="Meus cartões" />
      <View style={styles.body}>
        <Text style={[topography.h1, styles.title]}>Meus Cartões</Text>
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
});

export default MyCards;
