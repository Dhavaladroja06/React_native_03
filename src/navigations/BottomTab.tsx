import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from '../screen/Home/Home';

const Tab = createBottomTabNavigator()


const HomeBottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default HomeBottomTab;