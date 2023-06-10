import HttpClient from '../../global/httpClient';

export default {
  async saveCard(form: any) {
    try {
      await HttpClient.post('/cards', form);
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  },
};
