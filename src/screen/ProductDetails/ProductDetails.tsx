import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { ProductDetailsstyle } from './productDetails.style';
import { Ionicons } from "@expo/vector-icons"
import { Colors } from '../../constants/Color';
import { ProductProps } from '../../hooks/useHome';
import useProductDetailsLogic from '../../hooks/useProductDetails';
import { RouteProp, useRoute } from '@react-navigation/native'; 

type StarProps = {
    filled?: boolean;
}

const Star = ({ filled }: StarProps) => (
    <Ionicons name={filled ? "star" : "star-outline"} size={20} color={Colors.star_color} />
);

type RootStackParamList = {
    ProductDetails: { product: ProductProps };
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetails: React.FC = () => {
    const route = useRoute<ProductDetailsRouteProp>(); // Use useRoute with specific RouteProp type
    const { isLoading, addToCart } = useProductDetailsLogic({ product: route.params.product });

    if (!route || !route.params || !route.params.product) {
        return null;
    }

    const { product } = route.params;


    const renderStars = (rating: number | undefined) => {
        if (rating === undefined) {
            return null;
        }

        const filledStars = Math.floor(rating);
        const hasHalfStar = rating - filledStars >= 0.5;

        const stars = [];
        for (let i = 0; i < filledStars; i++) {
            stars.push(<Star key={i} filled />);
        }
        if (hasHalfStar) {
            stars.push(<Ionicons key={filledStars} name="star-half" size={20} color={Colors.star_color} />);
        }
        const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={filledStars + i} filled={undefined} />);
        }
        return stars;
    };

    const discountedPrice = product.price ? product.price - (product.price * (product.discountPercentage || 0) / 100) : undefined;

    return (
        <View style={ProductDetailsstyle.container}>
            <Swiper>
                {product.images && product.images.map((image: string, index: React.Key | null | undefined) => (
                    <View key={index} style={ProductDetailsstyle.ImageContainer} >
                        <Image source={{ uri: image }} style={ProductDetailsstyle.image} />
                    </View>
                ))}
            </Swiper>
            <View>
                <View style={ProductDetailsstyle.brandView}>
                    <Text style={ProductDetailsstyle.brand}>Brand: {product.brand}</Text>
                    <View style={ProductDetailsstyle.rating}>
                        <Text>{product.rating} </Text>
                        {renderStars(product.rating)}
                    </View>
                </View>
                <Text style={ProductDetailsstyle.title}>{product.title}</Text>
                <Text style={ProductDetailsstyle.description}>{product.description}</Text>
                <View style={ProductDetailsstyle.discountPercentageview}>
                    <Text style={ProductDetailsstyle.discountPercentage}> -{product.discountPercentage}%</Text>
                    {discountedPrice !== undefined && (
                        <View style={ProductDetailsstyle.priceview}>
                            <Text style={ProductDetailsstyle.symbol}>$</Text>
                            <Text style={ProductDetailsstyle.price}> {discountedPrice.toFixed(2)}</Text>
                        </View>
                    )}
                </View>
                <Text style={ProductDetailsstyle.Mrp}>M.R.P. : ${product.price}</Text>
                <Text style={ProductDetailsstyle.description}>
                    Only <Text style={ProductDetailsstyle.stock}>
                        {product.stock}
                    </Text> stock is available
                </Text>
                <Pressable
                    style={ProductDetailsstyle.buttton}
                    android_ripple={{ color: Colors.ripple_color }}
                    onPress={addToCart}
                >
                    {isLoading ? (
                        <ActivityIndicator color={Colors.white_color} size={20} />
                    ) : (
                        <Text style={ProductDetailsstyle.buttonText}>Add To Cart</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

export default ProductDetails;
