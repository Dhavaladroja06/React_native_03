import React from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native';
import { OrderStyle } from './Myorders.style';
import useOrderedProducts, { Order } from '../../hooks/useOrderedProducts';
import { ProductProps } from '../../hooks/useHome';

const Myorders = () => {
    const { orderedProducts, loading, refreshOrderedProducts } = useOrderedProducts();

    const onRefresh = () => {
        refreshOrderedProducts();
    };

    const renderItem = ({ item }:{item:Order}) => (
        <View style={OrderStyle.orderContainer}>
            <Text style={OrderStyle.date}>{item.date}</Text>
            <Text>your order placed at {item.time}</Text>
            {item.products.map((product:ProductProps, productIndex: number) => (
                <View key={productIndex} style={OrderStyle.TitleView}>
                    <Text style={OrderStyle.title}>{product.title}</Text>
                    <Text style={OrderStyle.quantity}>Quantity: {product.quantity}</Text>
                </View>
            ))}
        </View>
    );

    if (loading) {
        return (
            <View style={OrderStyle.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={OrderStyle.container}>
            {orderedProducts.length > 0 ? (
                <FlatList
                    data={orderedProducts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                />
            ) : (
                <View style={OrderStyle.emptyContainer}>
                    <Text style={OrderStyle.emptyText}>You don't have any orders</Text>
                </View>
            )}
        </View>
    );
};

export default Myorders;
