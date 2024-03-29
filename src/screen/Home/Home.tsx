import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TextInput, Pressable } from 'react-native';
import { Colors } from '../../constants/Color';
import { HomeStyle } from './Home.style';
import useProductLogic, { ProductProps } from '../../hooks/useHome';


const Home = () => {
    const {
        products,
        loading,
        refetch,
        handleProductPress,
        handleSearch,
    } = useProductLogic();


    if (loading) {
        return <ActivityIndicator color={Colors.primary} size={24} style={HomeStyle.loader} />;
    }

    const renderItem = ({ item }: { item: ProductProps }) => (
        <Pressable onPress={() => handleProductPress(item)}>
            <View style={HomeStyle.Maincontainer}>
                {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={HomeStyle.thumbnail} />}
                <Text style={HomeStyle.Title}>{item.title}</Text>
                <View style={HomeStyle.priceView}>
                    <Text style={HomeStyle.price}>$ {item.price}</Text>
                    <Text style={HomeStyle.discountPercentage}>{item.discountPercentage}% off</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={HomeStyle.searchInput}
                placeholder="🔍 Search Products..."
                onChangeText={handleSearch}
            />
            <View style={HomeStyle.flatlist}>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
}

export default Home;
