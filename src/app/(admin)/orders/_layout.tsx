import { Stack } from "expo-router"

export default function OrderLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="list" options={{ headerShown: false}} />
        
    </Stack>
  )
}