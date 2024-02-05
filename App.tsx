import React from 'react';
import LoginStack from './src/navigations/LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigations from './src/navigations/MainNavigations';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigations />
    </NavigationContainer>
  );
}

export default App;
