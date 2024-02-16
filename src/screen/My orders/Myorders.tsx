import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native'; 
import { AIP_URL } from '../../api';
import { ProductProps } from '../../hooks/useHome';
import { OrderStyle } from './Myorders.style';

type Order = {
    products: ProductProps[];
    date: string;
    time: string;
};

const Myorders = () => {
    const [orderedProducts, setOrderedProducts] = useState<Order[]>([]);
    const [refreshing, setRefreshing] = useState(false); 


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

    const onRefresh = async () => {
        setRefreshing(true); 
        const orderedData = await fetchOrderedProducts();
        setOrderedProducts(orderedData);
        setRefreshing(false); 
    };

    useEffect(() => {
        const fetchOrderedData = async () => {
            const orderedData = await fetchOrderedProducts();
            setOrderedProducts(orderedData);
        };

        fetchOrderedData();
    }, [])

    const renderItem = ({ item }: { item: Order }) => (
        <View style={OrderStyle.orderContainer}>
            <Text style={OrderStyle.date}>{item.date}</Text>
            <Text>your order placed at {item.time}</Text>
            {item.products.map((product, productIndex) => (
                <View key={productIndex} style={OrderStyle.TitleView}>
                    <Text style={OrderStyle.title}>{product.title}</Text>
                    <Text style={OrderStyle.quantity}>Quantity: {product.quantity}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={OrderStyle.container}>
        <FlatList
            data={orderedProducts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
        </View>
    );
};

export default Myorders;
