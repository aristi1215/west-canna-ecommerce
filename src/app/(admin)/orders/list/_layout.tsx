
import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";


//NO FUNCIONA EN IOS !!!!!!!!!

//GONORREOTA DE ELEMENTO NO FUNCION EN NINGUN LADO, CAREVERGA

// const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator () {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Tabs screenOptions={{tabBarStyle: { backgroundColor: 'white' }, tabBarLabelStyle: { textAlign: 'center', color: 'black' }, tabBarItemStyle: { width: 100 }  }}>
                <Tabs.Screen name="index" options={{ title: 'active' }} />
                <Tabs.Screen name="archive" options={{ title: 'Archived' }} />
            </Tabs>
        </SafeAreaView>
)
}