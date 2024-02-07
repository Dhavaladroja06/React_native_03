import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProductStacknavigations from './ProductStacknavigations';

const Tab = createBottomTabNavigator()


const HomeBottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown:false }}>
            <Tab.Screen name="ProductStack" component={ProductStacknavigations} />
        </Tab.Navigator>
    );
}

export default HomeBottomTab;