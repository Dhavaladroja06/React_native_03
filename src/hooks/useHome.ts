import { useState, useEffect } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useProductApi } from '../Query/ProductQurery';

export type ProductProps = {
    quantity: number;
    params: { product: any; };
    id: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
}


const useProductLogic = () => {
    const { data, refetch } = useProductApi();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    useEffect(() => {
        if (data && data.products) {
            const filtered = data.products.filter((item: ProductProps) =>
                item.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
            setLoading(false);
        }
    }, [data, searchQuery]);

    const handleProductPress = (item: ProductProps) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return {
        products: filteredProducts,
        loading,
        refetch,
        handleProductPress,
        handleSearch,
    };
};

export default useProductLogic;
