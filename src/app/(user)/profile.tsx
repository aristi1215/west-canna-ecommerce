import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { supabase } from '@/src/client/client'
import { router, Redirect } from 'expo-router';

export default function ProfileTab() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace('/signUp')
    }

  return (
    <View className='flex-1 bg-white justify-center items-center'>
        <Pressable onPress={() => handleSignOut()} className='bg-blue-600 w-[80%] rounded-full h-[5rem] items-center justify-center' >
            <Text className='text-white'>Log Out</Text>
        </Pressable>
    </View>
  )
}