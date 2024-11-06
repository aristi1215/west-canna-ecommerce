import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useAuthContext } from '@/src/context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isAdmin, session } = useAuthContext()


  
  if(session && !isAdmin) return <Redirect href={'/(user)/'} />
  if(!isAdmin) return <Redirect href={'/(auth)/'} />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: Colors.light.tint
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{href: null }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cafe' : 'cafe-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order',
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
