/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import BaseScreen from '../../global/baseScreen';
import topography from '../../global/typography';
import CustomButton from '../../components/CustomButton';
import theme from '../../global/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

function Home({navigation}: Props): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  const ToMyCards = async () => {
    navigation.navigate('MyCards');
  };

  const ToNewCard = async () => {
    navigation.navigate('NewCard');
  };

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
