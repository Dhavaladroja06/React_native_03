import React from 'react';
import { View, Text, FlatList, Image, Pressable, RefreshControl, Modal } from 'react-native';
import { ProductProps } from '../../hooks/useHome';
import { CartStyle } from './Cart.style';
import { Colors } from '../../constants/Color';
import { Ionicons } from "@expo/vector-icons";
import useCart from '../../hooks/useCart';
import MapView, { Marker } from 'react-native-maps';

const Cart = () => {
    const {
        cartProducts,
        refreshing,
        showMapModal,
        selectedLocation,
        selectedAddress,
        showBillModal,
        totalBill,
        fetchCartData,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeProduct,
        handleProceedToBuy,
        handleMapPress,
        handleMapDone,
        getLocationAddress,
        handleBuyNow,
        handlebillclose
    } = useCart();

    const renderCartProduct = ({ item }: { item: ProductProps }) => {
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
        );
    };

    return (
        <View style={CartStyle.container}>
            <FlatList
                data={cartProducts}
                renderItem={renderCartProduct}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCartData} />}
            />

            {cartProducts.length > 0 && (
                <Pressable style={CartStyle.BuyButton} onPress={handleProceedToBuy} android_ripple={{ color: Colors.ripple_color }}>
                    <Text style={CartStyle.BuyButtonText}>Proceed to Buy</Text>
                </Pressable>
            )}

            <Modal visible={showMapModal} animationType="slide">
                <MapView style={{ flex: 1 }} onPress={handleMapPress}>
                    {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
                <Pressable onPress={handleMapDone} style={CartStyle.MapDoneButton}>
                    <Text style={CartStyle.MapDoneButtonText}>Done</Text>
                </Pressable>
            </Modal>

            <Modal visible={showBillModal} animationType="fade">
                <View style={CartStyle.billContainer}>
                    <View style={CartStyle.billHeader}>
                        <Text style={CartStyle.billHeaderText}>Title</Text>
                        <Text style={CartStyle.billHeaderText}>Quantity</Text>
                        <Text style={CartStyle.billHeaderText}>Price</Text>
                        <Text style={CartStyle.billHeaderText}>Discount(%)</Text>
                        <Text style={CartStyle.billHeaderText}>Discounted Price</Text>
                    </View>
                    {cartProducts.map((product) => (
                        <View key={product.id} style={CartStyle.billItem}>
                            <Text style={CartStyle.billItemTitle}>{product.title}</Text>
                            <Text style={CartStyle.billItemtext}>{product.quantity}</Text>
                            <Text style={CartStyle.billItemtext}>${product.price?.toFixed(2) ?? 0}</Text>
                            <Text style={CartStyle.billItemtext}>{product.discountPercentage}%</Text>
                            <Text style={CartStyle.billItemtext}>${(product.price ? (product.price - (product.discountPercentage ?? 0) / 100) * product.quantity : 0).toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={CartStyle.billTotal}>
                        <Text style={CartStyle.totallable}>Total:</Text>
                        <Text style={CartStyle.totallable}>${totalBill.toFixed(2)}</Text>
                    </View>
                    <View style={CartStyle.modlebutton} >
                        <Pressable style={CartStyle.modleBuyButton} onPress={handleBuyNow} android_ripple={{ color: Colors.ripple_color }}>
                            <Text style={CartStyle.closeButtonText}>BuyNow</Text>
                        </Pressable>
                        <Pressable style={CartStyle.closeButton} onPress={handlebillclose}>
                            <Text style={CartStyle.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Cart;
