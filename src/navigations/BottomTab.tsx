import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProductStacknavigations from './ProductStacknavigations';
import Cart from '../screen/Cart/Cart';
import { DeviceEventEmitter } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"
import { Colors } from '../constants/Color';
import Myorders from '../screen/My orders/Myorders';
import useCart from '../hooks/useCart';
import CartTabIcon from '../components/CartTabIcon';


const Tab = createBottomTabNavigator()


type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}


const HomeBottomTab = () => {

    const navigation: Props = useNavigation();
    const {totalCount} = useCart()
    // const [cartProductCount, setCartProductCount] = useState(0);

    // useEffect(() => {
    //     setCartProductCount(cartProducts.length); 
    // }, [cartProducts]);

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
                    tabBarIcon: () => (
                        <Ionicons name="home-outline" size={25} color={Colors.white_color} />
                    ),
                    title: "Home",
                    tabBarActiveBackgroundColor: Colors.Title_color,
                    tabBarActiveTintColor: Colors.white_color,
                    tabBarInactiveTintColor: Colors.Title_color,
                    tabBarInactiveBackgroundColor:Colors.Title_color

                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: () => (
                        <CartTabIcon count={totalCount}/>
                    ),
                    title: "Cart",
                    tabBarActiveBackgroundColor: Colors.Title_color,
                    tabBarActiveTintColor: Colors.white_color,
                    tabBarInactiveTintColor:Colors.Title_color,
                    tabBarInactiveBackgroundColor:Colors.Title_color,
                    tabBarAllowFontScaling:true

                }}
            />
            <Tab.Screen
                name="MyOrders"
                component={Myorders}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="basket" size={25} color={Colors.white_color} />
                    ),
                    title: "My Order",
                    tabBarActiveBackgroundColor: Colors.Title_color,
                    tabBarActiveTintColor: Colors.white_color,
                    tabBarInactiveTintColor:Colors.Title_color,
                    tabBarInactiveBackgroundColor:Colors.Title_color,
                }}
            />
        </Tab.Navigator>
    );
}

export default HomeBottomTab;