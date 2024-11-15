import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { CartContextProvider } from "../context/CartProvider";
import "react-native-reanimated";
import "../../global.css";
import { AuthContextProvider } from "../context/AuthContext";
import { Image } from "react-native";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import QueryProvider from "../providers/QueryProvider";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationProvider from "../context/NotificationsContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''} >
        <AuthContextProvider>
          <QueryProvider>
          <NotificationProvider>
            <CartContextProvider>
              <Stack>
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="cart"
                  options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="index"
                  options={{
                    title: "West canna BC",
                    headerLeft: () => (
                      <Image
                        source={require("@assets/images/west-canna-logo.png")}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    ),
                  }}
                />
              </Stack>
            </CartContextProvider>
          </NotificationProvider>
          </QueryProvider>
        </AuthContextProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
