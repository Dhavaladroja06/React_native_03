import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, RefreshControl, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIP_URL } from '../../api';
import { ProductProps } from '../../hooks/useHome';
import { CartStyle } from './Cart.style';
import { Ionicons } from "@expo/vector-icons"
import { Colors } from '../../constants/Color';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<ProductProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            setRefreshing(true);
            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return;
            }
            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();
            const userCart = userDataFromServer.cart || [];
            setCartProducts(userCart);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        fetchCartData();
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        try {
            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return;
            }

            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();
            const userCart = userDataFromServer.cart || [];
            const updatedUserCart = userCart.map((product: { id: number; }) =>
                product.id === productId ? { ...product, quantity: newQuantity } : product
            );
            await fetch(`${AIP_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userDataFromServer, cart: updatedUserCart }),
            });
            setCartProducts(prevCartProducts =>
                prevCartProducts.map(product =>
                    product.id === productId ? { ...product, quantity: newQuantity } : product
                )
            );
        } catch (error) {
            console.error('Error updating quantity and cart data on the server:', error);
        }
    };

    const incrementQuantity = async (productId: number) => {
        try {
            const product = cartProducts.find(product => product.id === productId);
            if (!product) {
                return;
            }
            const newQuantity = product.quantity + 1;

            await updateQuantity(productId, newQuantity);
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };

    const decrementQuantity = async (productId: number) => {
        try {
            const product = cartProducts.find(product => product.id === productId);
            if (!product || product.quantity <= 1) {
                return;
            }
            const newQuantity = product.quantity - 1;
            await updateQuantity(productId, newQuantity);
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };


    const removeProduct = async (productId: number) => {
        try {
            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return;
            }

            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();
            const userCart = userDataFromServer.cart || [];
            const updatedUserCart = userCart.filter((product: { id: number; }) =>
                product.id !== productId
            );

            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this product?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            await fetch(`${AIP_URL}/${id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ ...userDataFromServer, cart: updatedUserCart }),
                            });
                            setCartProducts(updatedUserCart);
                        }
                    }
                ]
            );

        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };


    const renderCartProducter = ({ item }: { item: ProductProps }) => {

        const price = item.price ?? 0;
        const discountPercentage = item.discountPercentage ?? 0;
        const discountedPrice = price - (price * discountPercentage) / 100;
        const discountedPriceFormatted = discountedPrice.toFixed(2);


        return (
            <View style={CartStyle.MainContainer}>
                <View>
                    <Image source={{ uri: item.thumbnail }} style={CartStyle.Image} />
                </View>
                <View style={CartStyle.Details}>
                    <Text style={CartStyle.title}>{item.title}</Text>
                    <View style={CartStyle.DiscountView}>
                        <Text style={CartStyle.discountPercentage}>{item.discountPercentage}% off</Text>
                        <Text style={CartStyle.discounttext}>Deal of the day</Text>
                    </View>
                    <View style={CartStyle.DiscountView}>
                        <View style={CartStyle.discountedPrice}>
                            <Text>$</Text>
                            <Text style={CartStyle.Price}>{discountedPriceFormatted}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={CartStyle.Mrp}>M.R.P. :{item.price}</Text>
                        </View>
                    </View>
                    <Text style={CartStyle.brand}>Brand: {item.brand}</Text>
                    <View style={CartStyle.ButtonView}>
                        <View style={CartStyle.QuantityButtonsView}>
                            <Pressable onPress={() => decrementQuantity(item.id)}>
                                <Ionicons name="remove-outline" size={22} style={CartStyle.QuantityButtons} />
                            </Pressable>
                            <Text style={CartStyle.QuantityText}>{item.quantity}</Text>
                            <Pressable onPress={() => incrementQuantity(item.id)}>
                                <Ionicons name="add-outline" size={22} style={CartStyle.QuantityButtons} />
                            </Pressable>
                        </View>
                        <Pressable style={CartStyle.DeleteButton} onPress={() => removeProduct(item.id)}>
                            <Text>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={CartStyle.container}>
            {cartProducts.length > 0 ? (
                <FlatList
                    data={cartProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCartProducter}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            ) : (
                <Text>Your cart is empty.</Text>
            )}
            <Pressable style={CartStyle.BuyButton} android_ripple={{ color:Colors.ripple_color }}>
                <Text style={CartStyle.BuyButtonText}>Proceed to Buy</Text>
            </Pressable>
        </View>
    );
};

export default Cart;
