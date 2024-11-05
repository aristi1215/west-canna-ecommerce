import { Stack } from "expo-router";
import { ModalExample } from "@/src/components/Modal";

export default function MenuStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <ModalExample />
            )
        }} >
            <Stack.Screen name="index" options={{ title: 'Menu', headerTitleAlign: 'center' }} />
       
        </Stack>
    )
}