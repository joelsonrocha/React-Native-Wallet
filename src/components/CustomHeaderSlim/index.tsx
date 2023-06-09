import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {ArrowBackIcon} from '../../assets';
import topography from '../../global/typography';
import theme from '../../global/theme';

type CustomHeaderSlimProps = {
  title: string;
};
const CustomHeaderSlim = ({title}: CustomHeaderSlimProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainer}>
        <SvgXml xml={ArrowBackIcon} />
      </TouchableOpacity>
      <Text style={[styles.textContainer, topography.h3]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 24,
    marginTop: 21,
    position: 'relative',
    zIndex: 99,
  },
  buttonContainer: {
    position: 'absolute',
    height: 39,
    width: 39,
    borderRadius: 18.5,
    top: 6,
    left: 12,
  },
  textContainer: {
    color: theme.baseColor.blueLight,
  },
});

export default CustomHeaderSlim;
