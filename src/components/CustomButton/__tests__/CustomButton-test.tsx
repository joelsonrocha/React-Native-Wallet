/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CustomButton from '..';

it('renders CustomButton', () => {
  const eventClick = async () => {
    console.log('click');
  };
  renderer.create(
    <CustomButton
      onClick={() => eventClick}
      typeButton="primary"
      textButton="Olá"
    />,
  );
});
