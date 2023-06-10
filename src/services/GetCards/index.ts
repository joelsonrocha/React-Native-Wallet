import HttpClient from '../../global/httpClient';

export default {
  async getCards() {
    try {
      const {data} = await HttpClient.get('/cards');
      return data;
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  },
};
