import 'expo-dev-client';
// LIBRARY IMPORTS
import { useState, useEffect, useCallback } from "react";
// FONT IMPORTS
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
// LOCAL IMPORTS
// COMPONENTS
import MainApp from "components/MainApp";
import RegisterScreen from "components/screens/RegisterScreen";
// CONTEXTS
import { ThemeProvider } from "fitra/contexts/ThemeContext";
import { AuthProvider } from "fitra/contexts/AuthContext";

export default function App() {
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                // LOADS THE FONTS
                await loadAsync({
                    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
                    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
                    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
                    "Lato-Medium": require("./assets/fonts/Lato-Medium.ttf"),
                    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setIsAppReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isAppReady) {
            await SplashScreen.hideAsync();
        }
    }, [isAppReady]);

    if (!isAppReady) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <MainApp onLayoutRootView={onLayoutRootView} />
                <Toast visibilityTime={2000} />
            </ThemeProvider>
        </AuthProvider>
    );
}
