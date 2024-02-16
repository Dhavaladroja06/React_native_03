import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from 'react-native';

const CartTabIcon = ({ count }: {count:number}) => {
    return (
        <View style={styles.container}>
            <Ionicons name="cart-outline" size={25} color="white" />
            {count > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CartTabIcon;
