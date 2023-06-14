import HttpClient from '../../global/httpClient';
import store from '../../store';
import {addCard} from '../../store/cards/cardSlice';
export default {
  async saveCard(form: CardData) {
    if (!form) {
      return;
    }
    try {
      await HttpClient.post('/cards', form);
      store.dispatch(addCard(form));
    } catch (error) {
      console.log('Ocorreu um erro', error);
    }
  },
};
