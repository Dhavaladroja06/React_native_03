import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { AIP_URL } from '../api';


type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}

export const useSignupLogic = () => {
    const navigation: Props = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm();

    const handleSignUp = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const formData = getValues();
        console.log(formData);
        try {
            const response = await fetch(`${AIP_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 2500);
            } else {
                console.error('Failed to save user data');
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

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading,
        handleSignUp,
        handleLogin
    };
};
