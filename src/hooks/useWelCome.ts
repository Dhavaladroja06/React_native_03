import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

type Props = {
    navigate(arg0: string): unknown;
    navigations: NavigationProp<ParamListBase>
}

export const useWelcomeLogic = () => {
    const navigation: Props = useNavigation();

    const handleJoinNow = () => {
        navigation.navigate("Signup");
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return {
        handleJoinNow,
        handleLogin,
    };
};
