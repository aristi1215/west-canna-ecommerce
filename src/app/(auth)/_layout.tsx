import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack >
        <Stack.Screen name='index' />
        <Stack.Screen name='signIn' options={{title: 'Sign In', headerTitleAlign: 'center'}} />
        <Stack.Screen name='signUp' options={{title: 'Sign Up', headerTitleAlign: 'center'}} />
    </Stack>
  )
}

export default AuthLayout