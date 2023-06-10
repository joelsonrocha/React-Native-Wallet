/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import topography from '../../global/typography';
import theme from '../../global/theme';
import CustomHeaderFat from '../../components/CustomHeaderFat';
import {getCardService} from '../../services';
function MyCards(): JSX.Element {
  const getCards = useCallback(async () => {
    try {
      const result = await getCardService.getCards();
      console.log('cartões carregados', result);
    } catch (error) {
      console.log('Erro ao buscar cartões', error);
    }
  }, []);
  useEffect(() => {
    getCards();
  }, [getCards]);
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
