import { Stack } from "expo-router";
import { AddSquare, PencilSquare } from "@/assets/icons/icons";
import { Pressable } from "react-native";
import { Link } from "expo-router";

export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Menu', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#087c6c'} , headerRight: () => (
                <Link href={'/(admin)/menu/create'} asChild >
                    <Pressable>
                        <AddSquare/>
                    </Pressable>
                </Link>
               
               ) }} />
        </Stack>
    )
}