import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SignUpStyle } from './Signup.style';
import InputText from '../../components/InputText/InputText';
import { useForm } from 'react-hook-form';
import { Colors } from '../../constants/Color';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {

    const navigation = useNavigation()

    const {
        control,
        handleSubmit,
        formState:{errors},
        reset,
        getValues 
    } = useForm()

    const handleSignUp = async () => {
        const formData = getValues();
        console.log(formData); 
        reset(); 
        try {
            const response = await fetch('http://192.168.1.6:3000/UserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('User data saved successfully');
            } else {
                console.error('Failed to save user data');
            }
        } catch (error) {
            console.error('Error occurred while saving user data:', error);
        }
    };



    return (
        <View style={SignUpStyle.Container}>
            <Text style={SignUpStyle.Title}>Sign Up</Text>
                <InputText
                label="UserName"
                icon="person-outline"
                placeholder="Enter your username"
                control={control}
                name="UserName"
                rules={{ required: "*Username is required" }}
                error={errors.UserName}
                />
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
                <InputText
                label="Mobile Number"
                icon="call-outline"
                placeholder="Enter your mobile number"
                control={control}
                name="mobileNumber"
                rules={{
                    required: "*Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  }}
                  keyboardType="phone-pad"
                  maxLength={10}
                  error={errors.mobileNumber}
                />
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
                <Pressable style={SignUpStyle.Button} onPress={handleSubmit(handleSignUp)} android_ripple={{ color:Colors.primary }}>
                    <Text style={SignUpStyle.ButtonText}>Sign up</Text>
                </Pressable>
                <View style={SignUpStyle.ButtomView}>
                <Text style={SignUpStyle.AlreadyText}>Already have an account ?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={SignUpStyle.LoginText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Signup;