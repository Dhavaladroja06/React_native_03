import { StyleSheet } from "react-native"
import { Colors } from "../../constants/Color"

export const ProductDetailsstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white_color,
        paddingHorizontal: 5
    },
    ImageContainer: {
        flex: 1,
        backgroundColor: Colors.white_color,
        elevation: 10,
        shadowColor: Colors.Black_color,
        padding: 2,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    brandView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    brand: {
        marginTop: 3,
        fontSize: 14,
        color: Colors.primary
    },
    title: {
        fontSize: 20,
        fontWeight: "900",
        color: Colors.Black_color,
        marginTop: 5
    },
    description: {
        fontSize: 16,
        marginTop: 5,
        color: Colors.Black_color
    },
    discountPercentageview: {
        flexDirection: "row",
    },
    discountPercentage: {
        fontSize: 26,
        color: Colors.red_color,
        marginTop: 5,
        marginRight: 10
    },
    priceview: {
        flexDirection: "row",
    },
    symbol: {
        position: "absolute",
        left: 0,
        top: 11,
        fontSize: 14,
        color: Colors.price_color
    },
    price: {
        fontSize: 26,
        marginTop: 5,
        color: Colors.price_color
    },
    Mrp: {
        fontSize: 14,
        color: Colors.mrp_color,
        textDecorationLine: "line-through",
        textDecorationColor: Colors.mrp_color,
    },
    stock: {
        color: Colors.red_color,
        fontSize: 20,
    },
    buttton: {
        backgroundColor: Colors.star_color,
        margin: 10,
        padding: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.white_color
    }
})