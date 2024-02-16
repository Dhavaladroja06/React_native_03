import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const OrderStyle = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 3,
        backgroundColor:Colors.Quantity_color
    },
    orderContainer:{
        padding: 10,
        backgroundColor:Colors.white_color,
        borderRadius: 5,
        margin: 2
    },
    date:{
        fontSize: 22,
        fontWeight:"500",
        color:Colors.price_color
    },
    TitleView:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        fontSize: 16,
        fontWeight:"400",
    },
    quantity:{
        borderWidth: 2,
        borderColor:Colors.gray_color,
        padding: 3,
        borderRadius: 5,
        backgroundColor:Colors.Quantity_color,
        textAlign:"center"
    }
})