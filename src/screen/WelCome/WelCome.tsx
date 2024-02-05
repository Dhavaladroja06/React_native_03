import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { WelComeStyle } from './WelCome.style';
import { Colors } from '../../constants/Color';

type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}

const WelCome = () => {

    const navigation:Props = useNavigation()

    const handleJoinNow = () => {
        navigation.navigate("Signup")
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require("../../../assets/6666912.jpg")} style={WelComeStyle.Image} />
            <Text style={WelComeStyle.welcomeText}>Welcome!</Text>
            <Text style={WelComeStyle.greed}>Let's Get Started</Text>
            <Text style={WelComeStyle.Slogan}>"Shop smarter, not harder"</Text>
            <Pressable
                style={WelComeStyle.Button}
                onPress={handleJoinNow}
                android_ripple={{ color: Colors.primary }}
            >
                <Text style={WelComeStyle.ButtonText}>Join Now</Text>
            </Pressable>
            <View style={WelComeStyle.ButtomView}>
                <Text style={WelComeStyle.AlreadyText}>Already have an account ?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={WelComeStyle.LoginText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default WelCome;