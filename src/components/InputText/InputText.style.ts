import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const InputTextStyle = StyleSheet.create({
    
    lable: {
        fontSize:14,
        marginBottom: 5,
        backgroundColor:Colors.white_color,
        backfaceVisibility:"hidden",
        color:Colors.primary
    },
    L1:{
        justifyContent: "center",
        paddingVertical: 15,
        width:"100%",
    },
    L2:{
        position: "absolute",
        top: 9,
        zIndex: 1,
        justifyContent: "center",
        padding: 10,
    },
    inputContainer: {
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        padding: 12,
        borderColor:Colors.secondary,
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 4
    },
    icon: {
        marginLeft: 8,
        marginRight: 10,
        padding:5,
        backgroundColor:Colors.Icon_color,
        borderRadius: 10
    },
    input: {
        flex:1,
        color:Colors.primary,
        fontSize: 14
    },
    error: {
        color:Colors.red_color,
        fontSize: 12,
        padding: 3,
        alignSelf:"flex-end"
    },
    eyeicon:{
        padding: 5,
        marginRight:10,
        color:Colors.secondary,
    }
})