import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const LoginStyle = StyleSheet.create({
    Container:{
        flex:1,
        padding: 15,
        backgroundColor:Colors.white_color
    },
    Title: {
        marginTop: 150,
        fontSize: 30,
        fontWeight: "800",
        color: Colors.secondary,
    },
    Button:{
        padding: 20,
        borderRadius:8,
        marginTop: 30,
        backgroundColor:Colors.secondary,
        justifyContent:"center",
        alignItems:"center"
    },
    ButtonText:{
        color:Colors.white_color,
        fontWeight:"bold",
        fontSize: 20
    },
    inputContainer:{
        marginTop:10
    }
})