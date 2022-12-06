// LIBRARY IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREEN IMPORTS
import GetStartedScreen from "components/screens/GetStartedScreen";
import LoginScreen from "components/screens/LoginScreen";
import RegisterScreen from "components/screens/RegisterScreen";
import TabNavigator from "components/navigators/TabNavigator";

// CONTEXTS
import { useAuth } from "fitra/contexts/AuthContext";
import useAuthStore from "hooks/useAuthStore";

//  STACK
const Stack = createNativeStackNavigator();

const MainApp = ({ onLayoutRootView }) => {
    let isLoggedIn = useAuthStore(state => state.user.user_id);
    let isOnboardRead = useAuthStore(state => state.isOnboardRead);

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="DashboardTab"
                            component={TabNavigator}
                        />
                    </>
                ) :
                    <>
                        {!isOnboardRead && <Stack.Screen name="GetStarted" component={GetStartedScreen} />}
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainApp;
