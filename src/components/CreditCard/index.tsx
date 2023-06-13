import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import topography from '../../global/typography';
import theme from '../../global/theme';

type CreditCardProps = {
  card: CardData;
  index?: number;
  itemStyle?: ViewStyle;
};

const CreditCard = ({card, index, itemStyle}: CreditCardProps) => {
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
    <TouchableOpacity
      style={{borderWidth: 1, borderColor: 'red'}}
      onPress={() => {
        console.log('cartão clicado', card);
      }}>
      <View style={[styles.creditCard, cardStyles[card.typeCard], itemStyle]}>
        <Text
          style={[topography.h5, styles.title, cardStylesText[card.typeCard]]}>
          {cardTitle[card.typeCard]}
        </Text>
        <Text style={[topography.paragraph, cardStylesText[card.typeCard]]}>
          {card.name}
        </Text>
        <Text style={[topography.small, cardStylesText[card.typeCard]]}>
          {card.number}
        </Text>
        <Text style={[topography.small, cardStylesText[card.typeCard]]}>
          Validade {card.validate}
        </Text>
      </View>
    </TouchableOpacity>
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
