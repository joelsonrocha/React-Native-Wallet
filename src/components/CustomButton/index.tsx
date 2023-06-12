import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import theme from '../../global/theme';
import topography from '../../global/typography';

type ButtonProps = {
  typeButton: 'primary' | 'secondary' | 'disabled';
  textButton: string;
  disabled?: boolean;
  onClick: () => {};
};

function CustomButton({
  typeButton,
  textButton,
  onClick,
  ...restProps
}: ButtonProps): JSX.Element {
  const buttonStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    disabled: styles.disabled,
  };
  return (
    <TouchableOpacity
      style={[styles.container, buttonStyles[typeButton]]}
      onPress={onClick}
      {...restProps}>
      <Text style={[topography.h5, buttonStyles[typeButton], styles.text]}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  primary: {
    backgroundColor: theme.baseColor.blueLight,
    color: theme.textColor.white,
  },
  secondary: {
    backgroundColor: theme.baseColor.greenLight,
    color: theme.baseColor.blueDark,
  },
  disabled: {
    backgroundColor: theme.baseColor.greyLight,
    color: theme.textColor.grey,
  },
  text: {
    backgroundColor: 'transparent',
  },
});

export default CustomButton;
