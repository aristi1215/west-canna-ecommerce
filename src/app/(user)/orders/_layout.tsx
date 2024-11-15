import { Stack } from "expo-router"

export default function OrderLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{title: 'Orders', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#087c6c' } }} />
        <Stack.Screen name="[id]" options={{presentation: 'modal'}} />
    </Stack>
  )
}