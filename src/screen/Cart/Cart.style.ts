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
        elevation: 5,
        padding: 10
    },
    Image: {
        height: 200,
        width: 150,
        resizeMode: "stretch",
        marginRight: 10,
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
        marginTop: 7,
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
        backgroundColor: Colors.Quantity_color,
    },
    BuyButton: {
        width: "100%",
        backgroundColor: Colors.star_color,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
        elevation: 10
    },
    BuyButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.white_color
    },
    MapDoneButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    MapDoneButtonText: {
        color: Colors.white_color,
        fontSize: 16,
        fontWeight: 'bold',
    },
    addressContainer: {
        backgroundColor: Colors.white_color,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.gray_color,
    },
    addressText: {
        fontSize: 16,
        color: Colors.Black_color,
    },
    billContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white_color,
    },
    billHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    billHeaderText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },

    billItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    billTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        paddingTop: 10,
    },
    totallable:{
        fontSize: 18,
        fontWeight:"700",
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.gray_color,
        borderRadius: 5,
        width:"45%"
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:"center"
    },
    billItemTitle: {
        width: "20%",
        textAlign: "left",
        fontWeight:"500"
    },
    billItemtext:{
        width:"20%",
        textAlign:"center",
    },
    modlebutton:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    modleBuyButton: {
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.star_color,
        borderRadius: 5,
        width:"45%"
    },
    modlebuyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:"center",
        color:Colors.white_color
    },
    Billtitle:{
        fontSize: 20,
        fontWeight:"800",
        textAlign:"center",
        borderBottomWidth: 2,
        marginBottom: 5
    },
    successMessage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -100 }, { translateY: -100 }],
        backgroundColor: Colors.successBackground,
        padding: 10,
        borderRadius: 5,
        elevation: 5,
      },
      successMessageText: {
        color: Colors.successText,
        fontSize: 16,
        fontWeight: 'bold',
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