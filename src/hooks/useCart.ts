import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { ProductProps } from './useHome';
import { AIP_URL } from '../api';
import { Alert } from 'react-native';

const useCart = () => {
    const [cartProducts, setCartProducts] = useState<ProductProps[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [showMapModal, setShowMapModal] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>({
        latitude: 23.0592, longitude: 72.6646
    });
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [showBillModal, setShowBillModal] = useState(false);
    const [totalBill, setTotalBill] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        calculateTotalBill();
    }, [cartProducts]);

    const calculateTotalBill = () => {
        const total = cartProducts.reduce((acc, product) => {
            const price = product.price ?? 0;
            const discountPercentage = product.discountPercentage ?? 0;
            const discountedPrice = price - (price * discountPercentage) / 100;
            return acc + discountedPrice * product.quantity;
        }, 0);
        setTotalBill(total);
    };


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

    const handleProceedToBuy = async () => {
        setIsLoading(true)
        const userData = await AsyncStorage.getItem('loggedInUserData');
        if (!userData) {
            return;
        }

        const { id } = JSON.parse(userData);
        const response = await fetch(`${AIP_URL}/${id}`);
        const userDataFromServer = await response.json();

        if (userDataFromServer.address) {
            setIsLoading(false)
            setShowBillModal(true);
            return;
        }
        setIsLoading(false)
        setShowMapModal(true);
    };

    const handleMapPress = (event: any) => {
        setSelectedLocation(event.nativeEvent.coordinate);
        setSelectedAddress("");
    };

    const handleMapDone = async () => {
        if (selectedLocation) {
            try {
                const { latitude, longitude } = selectedLocation;
                const address = await getLocationAddress(latitude, longitude);
                setSelectedAddress(address);

                const userData = await AsyncStorage.getItem('loggedInUserData');
                if (!userData) {
                    return;
                }

                const { id } = JSON.parse(userData);
                const response = await fetch(`${AIP_URL}/${id}`);
                const userDataFromServer = await response.json();

                await fetch(`${AIP_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...userDataFromServer, address }),
                });
            } catch (error) {
                console.error('Error getting or updating address:', error);
            }
        }
        setShowMapModal(false);
    };

    const getLocationAddress = async (latitude: number, longitude: number): Promise<string> => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Location permission not granted');
        }

        const location = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (location.length > 0) {
            const { street, city, region, postalCode, country } = location[0];
            return `${street}, ${city}, ${region}, ${postalCode}, ${country}`;
        }
        return "Address not found";
    };

    const handleBuyNow = async () => {
        try {
            const date = new Date();
            const order = {
                date: date.toDateString(),
                time: date.toLocaleTimeString(),
                products: cartProducts
            };

            const userData = await AsyncStorage.getItem('loggedInUserData');
            if (!userData) {
                return;
            }
            const { id } = JSON.parse(userData);
            const response = await fetch(`${AIP_URL}/${id}`);
            const userDataFromServer = await response.json();
            const orders = userDataFromServer.orders || [];
            const updatedOrders = [...orders, order];

            await fetch(`${AIP_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userDataFromServer, orders: updatedOrders, cart: [] }),
            });
            setCartProducts([]);
            setShowBillModal(false);
        } catch (error) {
            console.error('Error processing order:', error);
        }
    };
    const handlebillclose = () => {
        setShowBillModal(false)
    }
    
    useEffect(() => {
        calculateTotalCount(); // Recalculate total count whenever cartProducts changes
    }, [cartProducts]);

    const calculateTotalCount = () => {
        const count = cartProducts.reduce((acc, product) => acc + product.quantity, 0);
        setTotalCount(count);
    };


    return {
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
        handlebillclose,
        isLoading,
        totalCount
    };
};

export default useCart;
