import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { Controller, FieldError } from 'react-hook-form';
import { Ionicons } from "@expo/vector-icons"
import { InputTextStyle } from './InputText.style';
import { Colors } from '../../constants/Color';

type InputTextProps = {
    placeholder: string;
    label: string;
    icon?: keyof typeof Ionicons.glyphMap
    secureTextEntry?: boolean;
    control: any;
    name: string;
    rules: Object;
    error?: FieldError | undefined;
    keyboardType?: KeyboardTypeOptions | undefined;
    maxLength?: number;
    defaultValue?: string
}

const InputText = ({
    placeholder,
    label,
    icon,
    secureTextEntry,
    control,
    name,
    rules,
    error,
    keyboardType,
    maxLength,
    defaultValue,
}: InputTextProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View>
            <View style={InputTextStyle.L1}>
                <View style={InputTextStyle.L2}>
                    <Text style={InputTextStyle.lable}>{label}</Text>
                </View>
            </View>

            <View style={InputTextStyle.inputContainer}>
                {icon && <Ionicons name={icon} size={22} style={InputTextStyle.icon} />}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={placeholder}
                            secureTextEntry={!showPassword && secureTextEntry}
                            onChangeText={(text) => onChange(text)}
                            onBlur={onBlur}
                            value={value}
                            keyboardType={keyboardType}
                            maxLength={maxLength}
                            style={InputTextStyle.input}
                            placeholderTextColor={Colors.secondary}
                        />
                    )}
                    name={name}
                    rules={rules}
                    defaultValue={defaultValue}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={22}
                            style={InputTextStyle.eyeicon}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={InputTextStyle.error}>{error.message}</Text>}
        </View>
    );
};

export default InputText;
