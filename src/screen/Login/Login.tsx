import React from 'react';
import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { LoginStyle } from './Login.style';
import InputText from '../../components/InputText/InputText';
import { Colors } from '../../constants/Color';
import { useLoginLogic } from '../../hooks/useLogin';
const Login = () => {
    const { control, handleSubmit, errors, handleLogin, isLoading } = useLoginLogic();

    return (
        <ScrollView style={LoginStyle.Container}>
            <Text style={LoginStyle.Title}>Login</Text>
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
                label="Password"
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
            <View style={LoginStyle.ButtomView}>
                <Text style={LoginStyle.AlreadyText}>Don't have an account ?</Text>
                <Pressable onPress={handleLogin}>
                    <Text style={LoginStyle.LoginText}>SignUp</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default Login;
