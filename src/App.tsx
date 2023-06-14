import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './routes';
import {Provider} from 'react-redux';
import store from './store';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
export default App;
