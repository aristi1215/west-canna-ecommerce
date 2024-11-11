import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { WeedLeaf } from '@/assets/icons/icons';
import { Profile } from '@/assets/icons/icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
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
          tabBarIcon: ({ color }) => (
            <WeedLeaf  color={color} />
          ),
          tabBarStyle: {backgroundColor: '#087c6c' },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: 'Orders',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='list-outline' color={focused ? 'white' : 'rgb(234, 236, 238 )'} />
          ),
          tabBarStyle: {backgroundColor: '#087c6c' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Orders',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='person-circle-outline' color={focused ? 'white' : 'rgb(234, 236, 238 )'} />
          ),
          tabBarStyle: {backgroundColor: '#087c6c' },
        }}
      />
    </Tabs>
  );
}
