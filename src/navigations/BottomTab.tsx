import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProductStacknavigations from './ProductStacknavigations';
import Cart from '../screen/Cart/Cart';
import { DeviceEventEmitter } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"
import { Colors } from '../constants/Color';

const Tab = createBottomTabNavigator()


type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}


const HomeBottomTab = () => {

    const navigation: Props = useNavigation();


    useEffect(() => {
        const AddedProductINcart = DeviceEventEmitter.addListener("ProductInCart", () => {
            navigation.navigate("Cart")
        });
        return () => {
            AddedProductINcart.remove()
        }
    }, [])

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="ProductStack"
                component={ProductStacknavigations}
                options={{
                    tabBarIcon: ({ size }) => (
                        <Ionicons name="home-outline" size={size} color={Colors.Title_color} />
                ),
                title:"Home",
                tabBarActiveBackgroundColor:Colors.Icon_color,
                tabBarActiveTintColor:Colors.Title_color
                }}
            />
            <Tab.Screen 
            name="Cart" 
            component={Cart}
            options={{
                tabBarIcon: ({ size }) => (
                    <Ionicons name="cart-outline" size={size} color={Colors.Title_color} />
            ),
            title:"Cart",
            tabBarActiveBackgroundColor:Colors.Icon_color,
            tabBarActiveTintColor:Colors.Title_color
            }}
            />
        </Tab.Navigator>
    );
}

export default HomeBottomTab;