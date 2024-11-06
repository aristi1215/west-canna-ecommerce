
import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";


const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator () {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopTabs screenOptions={{tabBarStyle: { backgroundColor: 'white' }, tabBarLabelStyle: { textAlign: 'center', color: 'black' }, tabBarItemStyle: { width: 100 }  }}>
                <TopTabs.Screen name="index" options={{ title: 'active' }} />
                <TopTabs.Screen name="archive" options={{ title: 'Archived' }} />
            </TopTabs>
        </SafeAreaView>
)
}