import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    Maincontainer: {
        flex:1,
        backgroundColor: Colors.white_color,
        padding: 15,
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 10,
        height: 282,
        // width:169,
        width:"97%",
        elevation: 10,
    },
    thumbnail: {
        resizeMode: "cover",
        height: 180,
        width: "100%",
        backgroundColor: Colors.Black_color
    },
    Title: {
        fontSize: 16,
        fontWeight: "800",
        marginTop: 5
    },
    price: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.price_color,
        marginTop: 5,
        marginRight: 5
    },
    priceView:{
        flexDirection: "row"
    },
    discountPercentage:{
        color:Colors.white_color,
        fontSize: 14,
        fontWeight:"500",
        marginTop: 6,
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
    flatlist:{ 
        justifyContent:"center",
        // alignItems:"center",
        flex:1,
     }
})