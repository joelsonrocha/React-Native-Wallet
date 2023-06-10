import theme from './theme';

const getCardColor = () => {
  const colors = [theme.textColor.black, theme.baseColor.greenLight];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return {color: colors[randomIndex], index: randomIndex};
};

export default getCardColor;
