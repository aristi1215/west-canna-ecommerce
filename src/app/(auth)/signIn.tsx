import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { supabase } from "@/src/client/client";
import { useAuthContext } from '../../context/AuthContext';

const signIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const inputStyle = "border border-gray-500 rounded-lg p-1 w-full my-2";

  const handleSignIn = async () => {

    setLoading(true)

    const { data , error } = await supabase.auth.signInWithPassword({ email, password })
    const { profile } = useAuthContext()

    if(error) { 
      console.log('hola')
      console.error(error)
      alert(error.message)
      setLoading(false)
      return
    };
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-[10%]">
      <Text className="text-start w-full">Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email@gmail.com"
        className={inputStyle}
      />

      <Text className="text-start w-full">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="*****"
        className={inputStyle}
        textContentType="password"
      />

      <Pressable
        onPress={handleSignIn}
        className="bg-[#087c6c] rounded-full w-full h-[3rem] justify-center my-10"
        disabled={loading}
      >
        <Text className="text-white text-center">{loading ? 'SignIn In...' : 'Sign In' }</Text>
      </Pressable>

      <Link href={"/(auth)/signUp"}>
        <Text className="decoration-dashed text-[#087c6c] ">Don't have an account? Sign Up</Text>
      </Link>
    </View>
  );
};

export default signIn;
