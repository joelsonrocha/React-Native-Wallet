import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {ArrowBackIcon, PlusIcon} from '../../assets';
import topography from '../../global/typography';
import theme from '../../global/theme';

type CustomHeaderFatProps = {
  title: string;
  subtitle: string;
  onClick?: () => {};
};
const CustomHeaderFat = ({title, subtitle, onClick}: CustomHeaderFatProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const AddNewCard = () => {
    navigation.navigate({name: 'NewCard'} as never);
  };

  return (
    <View style={styles.containerCustomHeaderFat}>
      <View style={styles.containerUpCustomHeaderFat}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <View style={styles.viewButton}>
            <SvgXml xml={ArrowBackIcon} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.viewTextContainerCustomHeaderFat, topography.h3]}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => AddNewCard()}>
          <View style={styles.viewButton}>
            <SvgXml xml={PlusIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerDownCustomHeaderFat}>
        <TouchableOpacity
          onPress={() => (onClick ? onClick() : null)}
          style={styles.buttonMyCards}>
          <Text
            style={[styles.textDownContainerCustomHeaderFat, topography.h4]}>
            {subtitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCustomHeaderFat: {
    backgroundColor: theme.baseColor.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 99,
    height: 136,
    width: '100%',
  },
  containerUpCustomHeaderFat: {
    flexDirection: 'row',
    height: 66,
    width: '100%',
    backgroundColor: theme.baseColor.greyLight,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
    paddingHorizontal: 23.5,
  },
  viewTextContainerCustomHeaderFat: {
    color: theme.baseColor.blueDark,
    textAlign: 'center',
    flex: 5,
  },
  viewButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerDownCustomHeaderFat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: theme.baseColor.greyLight,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  textDownContainerCustomHeaderFat: {
    color: theme.baseColor.blueLight,
    textAlign: 'center',
  },
  buttonMyCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default CustomHeaderFat;
