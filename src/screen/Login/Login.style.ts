import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

export const LoginStyle = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.white_color
    },
    Title: {
        marginTop: 150,
        fontSize: 30,
        fontWeight: "800",
        color: Colors.secondary,
    },
    Button: {
        padding: 20,
        borderRadius: 8,
        marginTop: 30,
        backgroundColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center"
    },
    ButtonText: {
        color: Colors.white_color,
        fontWeight: "bold",
        fontSize: 20
    },
    ButtomView: {
        flexDirection: "row",
        marginTop: 25,
        justifyContent: "center",
        marginBottom: 25
    },
    AlreadyText: {
        fontSize: 16,
        color:Colors.Black_color
    },
    LoginText: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight:"bold",
        color:Colors.primary
    },
})