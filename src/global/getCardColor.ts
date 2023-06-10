import {TextStyle, ViewStyle} from 'react-native';
import theme from './theme';

interface CustomStyle {
  container: ViewStyle;
  cardData: TextStyle;
}

const getCustomStyle = () => {
  const colorsContainer = [theme.textColor.black, theme.baseColor.greenLight];
  const colorsText = [theme.textColor.white, theme.textColor.greyDark];
  const title = ['Black Card', 'Green Card'];
  const ramdomIndex = Math.floor(Math.random() * colorsContainer.length);
  const ramdomColorsContainer = colorsContainer[ramdomIndex];
  const ramdomColorsText = colorsText[ramdomIndex];

  const customStyle: CustomStyle = {
    container: {
      backgroundColor: ramdomColorsContainer,
    },
    cardData: {
      color: ramdomColorsText,
    },
  };

  return {customStyle: customStyle, title: title[ramdomIndex]};
};

export default getCustomStyle;
