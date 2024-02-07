import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home/Home';
import ProductDetails from '../screen/ProductDetails/ProductDetails';

const Stack = createNativeStackNavigator()

const ProductStacknavigations = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown :false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
}

export default ProductStacknavigations;