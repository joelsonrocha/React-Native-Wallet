import HttpClient from '../../global/httpClient';

export default {
  async saveCard(form: CardData) {
    console.log('salvar card', form);
    try {
      await HttpClient.post('/cards', form);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  },
};
