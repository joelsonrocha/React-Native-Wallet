/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CreditCard from '..';
import {Provider} from 'react-redux';
import store from '../../../store';

it('renders CreditCard', () => {
  const cardMock: CardData = {
    id: '954bf86c-4c49-47f6-8004-b1c5bade49b4',
    name: 'ffhhgg high',
    number: '2888 8888 8888 8888',
    cvv: '2222',
    validate: '11/22',
    typeCard: 'green',
  };
  renderer.create(
    <Provider store={store}>
      <CreditCard card={cardMock} />
    </Provider>,
  );
});
