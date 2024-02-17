import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { WelComeStyle } from './WelCome.style';
import { Colors } from '../../constants/Color';
import { useWelcomeLogic } from '../../hooks/useWelCome';

const WelCome = () => {

    const {handleJoinNow, handleLogin} = useWelcomeLogic() 

    return (
        <View style={WelComeStyle.Container}>
            <Image source={require("../../../assets/6666912.png")} style={WelComeStyle.Image} />
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
                <Pressable onPress={handleLogin}>
                    <Text style={WelComeStyle.LoginText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default WelCome;