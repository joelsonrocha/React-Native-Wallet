import {TextStyle, ViewStyle} from 'react-native';
import theme from './theme';

interface CustomStyle {
  container: ViewStyle;
  cardData: TextStyle;
}

const getCustomStyle = () => {
  const colorsContainer = [theme.textColor.black, theme.baseColor.greenLight];
  const colorBorder = [theme.baseColor.greenLight, theme.textColor.black];
  const colorsText = [theme.textColor.white, theme.textColor.greyDark];
  const title = ['Black Card', 'Green Card'];
  const ramdomIndex = Math.floor(Math.random() * colorsContainer.length);
  const ramdomColorsContainer = colorsContainer[ramdomIndex];
  const ramdomColorBorder = colorBorder[ramdomIndex];
  const ramdomColorsText = colorsText[ramdomIndex];

  const customStyle: CustomStyle = {
    container: {
      backgroundColor: ramdomColorsContainer,
      borderTopColor: ramdomColorBorder,
      borderWidth: 0.5,
    },
    cardData: {
      color: ramdomColorsText,
    },
  };

  return {customStyle: customStyle, title: title[ramdomIndex]};
};

export default getCustomStyle;
