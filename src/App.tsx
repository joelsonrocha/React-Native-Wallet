/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './routes';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  });

  return <Routes />;
}
export default App;
