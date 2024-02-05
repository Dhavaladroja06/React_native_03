import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, ScrollView, Alert, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { LoginStyle } from './Login.style';
import { useForm } from 'react-hook-form';
import InputText from '../../components/InputText/InputText';
import { Colors } from '../../constants/Color';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { AIP_URL } from '../../components/api';
import AsyncStorage from "@react-native-async-storage/async-storage";


type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}
type UserData = {
    Email: string;
    password: string;
}


const Login = () => {

    const navigation: Props = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserData[] | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm()

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${AIP_URL}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error occurred while fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogin = () => {
        if (isLoading) return;
        setIsLoading(true);

        const formData = getValues();
        const { Email, password } = formData;
        console.log("formData", formData)

        try {
            if (userData) {
                const user = userData.find(
                    (user: UserData) =>
                        user.Email === Email && user.password === password
                );
                if (user) {
                    setTimeout(async () => {
                        await AsyncStorage.setItem('isLoggedIn', 'true');
                        DeviceEventEmitter.emit("loginSuccess")
                        console.log("Login success event emitted");
                    }, 5000);
                } else {
                    Alert.alert('Invalid credentials', 'Please enter valid email and password.');
                }
            } else {
                console.error('Error', 'Failed to fetch user data. Please try again later.');
            }
        } catch (error) {
            console.error('Error occurred while saving user data:', error);
        }
        finally {
            setTimeout(() => {
                setIsLoading(false);
                reset();
            }, 5000);
        }
    };



    return (
        <ScrollView style={LoginStyle.Container}>
            <Text style={LoginStyle.Title}>Login</Text>
            <View style={LoginStyle.inputContainer}>
                <InputText
                    label="Email"
                    icon="mail-outline"
                    placeholder="Enter your email"
                    control={control}
                    name="Email"
                    rules={{
                        required: "*Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                            message: "Invalid email address",
                        },
                    }}
                    keyboardType="email-address"
                    error={errors.Email}
                />
            </View>
            <View style={LoginStyle.inputContainer}>
                <InputText
                    label="PassWord"
                    icon="lock-closed-outline"
                    placeholder="Enter your password"
                    control={control}
                    name="password"
                    rules={{
                        required: "*Password is required",
                        minLength: {
                            value: 6,
                            message: "Password should be at least 6 characters",
                        },
                    }}
                    secureTextEntry={true}
                    maxLength={8}
                    error={errors.password}
                />
            </View>
            <Pressable
                style={LoginStyle.Button}
                android_ripple={{ color: Colors.primary }}
                onPress={handleSubmit(handleLogin)}
            >
                {isLoading ? (
                    <ActivityIndicator color={Colors.primary} size={24} />
                ) : (
                    <Text style={LoginStyle.ButtonText}>Log in</Text>
                )}
            </Pressable>
        </ScrollView>
    );
}

export default Login;