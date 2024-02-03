import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screen/Signup/Signup';
import WelCome from '../screen/WelCome/WelCome';
import Login from '../screen/Login/Login';

const Stack = createNativeStackNavigator()

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelCome} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default LoginStack;