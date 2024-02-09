import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Color';

export const CartStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: Colors.Quantity_color
    },
    MainContainer: {
        flexDirection: "row",
        marginTop: 2,
        backgroundColor: Colors.white_color,
        elevation: 10,
        padding: 10
    },
    Image: {
        height: 200,
        width: 150,
        resizeMode: "stretch",
        marginRight: 10
    },
    Details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        marginTop: 10
    },
    DiscountView: {
        flexDirection: "row",
        marginTop: 3
    },
    discountPercentage: {
        backgroundColor: Colors.red_color,
        color: Colors.white_color,
        borderRadius: 2,
        fontSize: 12,
        padding: 2,
        marginRight: 3
    },
    discounttext: {
        color: Colors.red_color,
        fontSize: 12
    },
    discountedPrice: {
        flexDirection: "row",
    },
    Price: {
        fontSize: 22,
        fontWeight: "700",
        marginLeft: 2
    },
    Mrp: {
        fontSize: 14,
        marginLeft: 5,
        color: Colors.mrp_color,
        textDecorationLine: "line-through",
        textDecorationColor: Colors.mrp_color
    },
    QuantityButtonsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderColor: Colors.gray_color,
        width: "45%",
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 7
    },
    QuantityButtons: {
        borderWidth: 1,
        borderColor: Colors.gray_color,
        padding: 1,
        backgroundColor: Colors.Quantity_color
    },
    QuantityText: {
        fontSize: 14,
        color: Colors.primary
    },
    brand: {
        fontSize: 14,
        color: Colors.primary,
        marginTop: 3
    },
    ButtonView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    DeleteButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.gray_color,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 7,
        borderRadius: 3,
        backgroundColor: Colors.Quantity_color
    },
    BuyButton: {
        width: "100%",
        backgroundColor: Colors.star_color,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom:6
    },
    BuyButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.white_color
    }
})