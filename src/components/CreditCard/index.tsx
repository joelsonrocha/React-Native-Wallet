import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import topography from '../../global/typography';
import theme from '../../global/theme';

type CreditCardProps = {
  cardNumber: string;
  validate: string;
  personName: string;
  typeCard: 'black' | 'green';
  itemStyle?: ViewStyle;
};

const CreditCard = ({
  cardNumber,
  validate,
  personName,
  typeCard,
  itemStyle,
}: CreditCardProps) => {
  const cardStyles = {
    black: styles.creditCardBlack,
    green: styles.creditCardGreen,
  };

  const cardStylesText = {
    black: styles.creditCardBlackText,
    green: styles.creditCardGreenText,
  };

  const cardTitle = {
    black: 'Black Card',
    green: 'Green Card',
  };
  return (
    <View style={[styles.creditCard, cardStyles[typeCard], itemStyle]}>
      <Text style={[topography.h5, styles.title, cardStylesText[typeCard]]}>
        {cardTitle[typeCard]}
      </Text>
      <Text style={[topography.paragraph, cardStylesText[typeCard]]}>
        {personName}
      </Text>
      <Text style={[topography.small, cardStylesText[typeCard]]}>
        {cardNumber}
      </Text>
      <Text style={[topography.small, cardStylesText[typeCard]]}>
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
  creditCardBlack: {
    backgroundColor: theme.textColor.black,
    borderTopColor: theme.baseColor.greenLight,
    borderWidth: 0.5,
  },
  creditCardBlackText: {
    color: theme.textColor.white,
  },
  creditCardGreen: {
    backgroundColor: theme.baseColor.greenLight,
    borderTopColor: theme.textColor.black,
    borderWidth: 0.5,
  },
  creditCardGreenText: {
    color: theme.textColor.greyDark,
  },
});

export default CreditCard;
