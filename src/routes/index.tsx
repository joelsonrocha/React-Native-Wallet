import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import MyCards from '../pages/MyCards';
import NewCard from '../pages/NewCard';

export type RootStackParamList = {
  Home: undefined;
  MyCards: undefined;
  NewCard: undefined;
};

export default function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyCards"
          component={MyCards}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewCard"
          component={NewCard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
