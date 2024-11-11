import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/src/client/client";
import { Alert } from "react-native";

const signIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const inputStyle = "border border-gray-500 rounded-lg p-1 w-full my-2";


  const signUpWithEmail = async () => {
    setLoading(true)
    const {error} = await supabase.auth.signUp({email,password})
    if(error){
      alert(error.message)
      setLoading(true)
      return
    }
    setLoading(false)
  }

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
          textContentType="newPassword"
        />

        <Pressable
          onPress={signUpWithEmail}
          className="bg-[#087c6c] rounded-full w-full h-[3rem] justify-center my-10"
          disabled={loading}
        >
          <Text className="text-white text-center">
           {loading ? 'SignIn Up...' : 'Sign Up'}
          </Text>
        </Pressable>

        <Link href={'/(auth)/signIn'}>
            <Text className="decoration-dashed text-[#087c6c] mt-10">Already have an account? Sign In</Text>
        </Link>
      </View>
     
  )
}

export default signIn
