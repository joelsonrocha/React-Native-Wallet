import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import BaseScreen from '../../global/baseScreen';
import topography from '../../global/typography';
import CustomButton from '../../components/CustomButton';
import theme from '../../global/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes';
import {useDispatch} from 'react-redux';
import {addCards} from '../../store/cards/cardSlice';
import {getCardService} from '../../services';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

function Home({navigation}: Props): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  });

  const ToMyCards = async () => {
    navigation.navigate('MyCards');
  };

  const ToNewCard = async () => {
    navigation.navigate('NewCard');
  };

  const getCards = useCallback(async () => {
    try {
      const result = await getCardService.getCards();
      dispatch(addCards(result));
    } catch (error) {
      console.log('Erro ao buscar cartões', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCards();
    });
    return unsubscribe;
  }, [navigation, getCards]);

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={[topography.h1, styles.title]}>Wallet Test</Text>
        <CustomButton
          textButton="meus cartões"
          typeButton="primary"
          onClick={() => ToMyCards()}
        />
        <CustomButton
          textButton="cadastrar cartão"
          typeButton="secondary"
          onClick={() => ToNewCard()}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subtitle: {
    color: theme.baseColor.greenLight,
  },
});

export default Home;
