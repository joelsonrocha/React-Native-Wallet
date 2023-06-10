import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import topography from '../../global/typography';
import getCustomStyle from '../../global/getCardColor';
import theme from '../../global/theme';

type CreditCardProps = {
  cardNumber: string;
  validate: string;
  personName: string;
};
const CreditCard = ({cardNumber, validate, personName}: CreditCardProps) => {
  const cardStyle = getCustomStyle();
  return (
    <View style={[styles.creditCard, cardStyle.customStyle.container]}>
      <Text
        style={[topography.h5, styles.title, cardStyle.customStyle.cardData]}>
        {cardStyle.title}
      </Text>
      <Text style={[topography.paragraph, cardStyle.customStyle.cardData]}>
        {personName}
      </Text>
      <Text style={[topography.small, cardStyle.customStyle.cardData]}>
        {cardNumber}
      </Text>
      <Text style={[topography.small, cardStyle.customStyle.cardData]}>
        Validade {validate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  creditCard: {
    width: 300,
    height: 180,
    borderRadius: 16,
    paddingTop: 30,
    paddingLeft: 15,
    marginBottom: 30,
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
});

export default CreditCard;
