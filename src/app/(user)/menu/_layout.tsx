import { Stack } from "expo-router";
import { ModalExample } from "@/src/components/Modal";

export default function MenuStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <ModalExample />
            )
        }} >
            <Stack.Screen name="index" options={{ title: 'Shopping', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#087c6c' } }} />
       
        </Stack>
    )
}