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
        backgroundColor:Colors.order_color,
        margin: 10,
        padding:5,
        borderRadius: 5,
        elevation: 10,
        justifyContent:"space-around"
    },
    title:{
        fontSize: 16,
        fontWeight:"400",
        width: "50%"
    },
    quantity:{
       fontSize:16,
       fontWeight:"400",
       width:"50%"
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.mrp_color,
    },
})