import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, DeviceEventEmitter } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AIP_URL } from '../api';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export type UserData = {
    Email: string;
    password: string;
}

type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}

export const useLoginLogic = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserData[] | null>(null);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const navigation: Props = useNavigation();

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

    const handleLogin: SubmitHandler<any> = async (formData) => {
        if (isLoading) return;
        setIsLoading(true);

        const { Email, password } = formData;

        try {
            if (userData) {
                const user = userData.find(
                    (user: UserData) =>
                        user.Email === Email && user.password === password
                );
                if (user) {
                    setTimeout(async () => {
                        await AsyncStorage.setItem('isLoggedIn', 'true');
                        await AsyncStorage.setItem('loggedInUserData', JSON.stringify(user));
                        DeviceEventEmitter.emit("loginSuccess")
                    }, 2500);
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
            }, 2500);
        }
    };

    const handleSignUp = () => {
        navigation.navigate("Signup")
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return { 
        control,
        handleSubmit, 
        errors, handleLogin, 
        isLoading, 
        handleSignUp 
    };
};
