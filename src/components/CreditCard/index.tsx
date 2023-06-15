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
import {useDispatch, useSelector} from 'react-redux';
import {addCardToUse, cardsToUseState} from '../../store/cards/cardSlice';

type CreditCardProps = {
  card: CardData;
  itemStyle?: ViewStyle;
};

const CreditCard = ({card, itemStyle}: CreditCardProps) => {
  const cardToUse = useSelector(cardsToUseState);
  const dispatch = useDispatch();
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
      onPress={() => {
        dispatch(addCardToUse(card));
      }}>
      <View style={[styles.creditCard, cardStyles[card.typeCard], itemStyle]}>
        {cardToUse === card && <View style={styles.badgeSelected} />}
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
    position: 'relative',
  },
  badgeSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.alert.yellow,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  creditCardBlack: {
    backgroundColor: theme.textColor.black,
  },
  creditCardBlackText: {
    color: theme.textColor.white,
  },
  creditCardGreen: {
    backgroundColor: theme.baseColor.greenLight,
  },
  creditCardGreenText: {
    color: theme.textColor.greyDark,
  },
});

export default CreditCard;
