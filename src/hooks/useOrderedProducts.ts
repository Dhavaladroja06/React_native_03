import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIP_URL } from '../api';
import { ProductProps } from './useHome';


export type Order = {
    products: ProductProps[];
    date: string;
    time: string;
};

const useOrderedProducts = () => {
    const [orderedProducts, setOrderedProducts] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrderedProducts = async () => {
        try {
            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return [];
            }

            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();

            return userDataFromServer.orders || [];
        } catch (error) {
            console.error('Error fetching ordered products:', error);
            return [];
        }
    };

    const refreshOrderedProducts = async () => {
        setLoading(true);
        const orderedData = await fetchOrderedProducts();
        setOrderedProducts(orderedData);
        setLoading(false);
    };

    useEffect(() => {
        refreshOrderedProducts();
    }, []);

    return { orderedProducts, loading, refreshOrderedProducts };
};

export default useOrderedProducts;
