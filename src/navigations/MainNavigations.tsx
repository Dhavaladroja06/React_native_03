import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeBottomTab from "./BottomTab";
import LoginStack from "./LoginStack";
import { ActivityIndicator, DeviceEventEmitter, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Color";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator()

const MainNavigations = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const checkSignInStatus = async () => {
            const signedInStatus = await AsyncStorage.getItem("isLoggedIn");
            setIsSignedIn(signedInStatus === "true");
            setIsLoading(false);
        };

        const loginSuccessSubscription = DeviceEventEmitter.addListener("loginSuccess",()=> {
            setIsSignedIn(true)
        });

        const logoutSubscription = DeviceEventEmitter.addListener("logout", () => {
            setIsSignedIn(false);
          });

        checkSignInStatus();

        return () => {
            loginSuccessSubscription.remove();
            logoutSubscription.remove();
        };
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("isLoggedIn");
        setIsSignedIn(false);
    };

    if (isLoading) {
        return <ActivityIndicator color={Colors.primary} size={50} style={styles.Loader} />;
    }


    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <Stack.Screen
                    name="HomeBottomTab"
                    component={HomeBottomTab}
                    options={{
                        title:"ShopOnline",
                        headerRight: () => (
                            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                                <Ionicons name="log-out-outline" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }}
                />
            ) : (
                <Stack.Screen name="RegisterPage" component={LoginStack} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    Loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logoutButton: {
        marginRight: 15,
    },
})

export default MainNavigations;