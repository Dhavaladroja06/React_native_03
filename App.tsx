import React from 'react';
import LoginStack from './src/navigations/LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigations from './src/navigations/MainNavigations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainNavigations />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
