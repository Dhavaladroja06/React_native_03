import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ProductScreen_color,
        paddingHorizontal: 2
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    Maincontainer: {
        backgroundColor: Colors.white_color,
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 10,
        height: 165,
        width: 169,
        elevation: 10,
        shadowColor: Colors.Black_color,
        shadowRadius: 5,
        shadowOpacity: 2
    },
    thumbnail: {
        resizeMode: "cover",
        height: 90,
        width: "100%",
        backgroundColor: Colors.Black_color
    },
    Title: {
        fontSize: 14,
        fontWeight: "800",
        marginTop: 2
    },
    price: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.price_color,
        marginTop: 2,
        marginRight: 5
    },
    priceView:{
        flexDirection: "row"
    },
    discountPercentage:{
        color:Colors.white_color,
        fontSize: 12,
        fontWeight:"500",
        marginTop: 3,
        backgroundColor:Colors.red_color,
        padding: 2
    },
    searchInput: {
        height: 40,
        borderColor: Colors.gray_color,
        backgroundColor:Colors.white_color,
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        margin: 10,
    },
})