import { StyleSheet } from "react-native"
import { Colors } from "../../constants/Color"

export const WelComeStyle = StyleSheet.create({
    Image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.primary,
        position: 'absolute',
        top: 80,
        left: 20,
    },
    greed: {
        fontSize: 25,
        fontWeight: "800",
        color: Colors.primary,
        position: "absolute",
        top: 130,
        left: 20,
    },
    Slogan: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.primary,
        position: "absolute",
        top: 170,
        left: 20
    },
    Button: {
        position: "absolute",
        bottom: 50,
        right: 10,
        left: 10,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        backgroundColor: Colors.secondary
    },
    ButtonText: {
        color: Colors.white_color,
        fontWeight: "bold",
        fontSize: 20
    },
    ButtomView: {
        position: "absolute",
        bottom: 15,
        flexDirection: "row",
        padding: 10,
        left: 50
    },
    AlreadyText: {
        fontSize: 16,
        color: Colors.Black_color,
    },
    LoginText: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: "bold",
        color: Colors.primary
    }
})