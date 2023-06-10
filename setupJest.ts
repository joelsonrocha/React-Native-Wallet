jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});
