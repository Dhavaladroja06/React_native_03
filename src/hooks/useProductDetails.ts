import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import { AIP_URL } from '../api';
import { ProductProps } from './useHome';

const useProductDetailsLogic = ({product}:{product:ProductProps}) => {
    const [isLoading, setIsLoading] = useState(false);

    const addToCart = async () => {
        try {
            setIsLoading(true);
            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return;
            }
            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();
            const userCart = userDataFromServer.cart || [];
            const existingProductIndex = userCart.findIndex((item: { id: number; }) => item.id === product.id);
            if (existingProductIndex !== -1) {
                userCart[existingProductIndex].quantity += 1;
            } else {
                const productToAdd = { ...product, quantity: 1 };
                userCart.push(productToAdd);
            }
            const updatedUserData = { ...userDataFromServer, cart: userCart };
            await fetch(`${AIP_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });
            console.log('Product added to the cart!');
            setTimeout(() => {
                setIsLoading(false);
                DeviceEventEmitter.emit("ProductInCart");
            }, 2500);
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding product to the cart:', error);
        }
    };

    return { isLoading, addToCart };
};

export default useProductDetailsLogic;
