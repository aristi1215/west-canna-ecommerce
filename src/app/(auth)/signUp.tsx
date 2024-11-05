import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";

const signIn = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputStyle = "border border-gray-500 rounded-lg p-1 w-full my-2";

  const validateFields = () => {
    if (!name) {
      setError("Name must be filled");
      return false;
    }

    if (!password) {
      setError("Password must be filled");
      return false;
    }

    setName("");
    setError("");
    setError("");
    return true;
  };


  const handleSignUp = () => {
    console.log('Registrandongo mongo bro')
  }

  return (
      <View className="flex-1 bg-white justify-center items-center px-[10%]">

        <Text className="text-start w-full">Email</Text>

        <TextInput
          value={name}
          onChangeText={setName}
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
          onPress={handleSignUp}
          className="bg-blue-500 rounded-full w-full h-[3rem] justify-center mt-10"
        >
          <Text className="text-white text-center">
            Sign Up
          </Text>
        </Pressable>

        <Link href={'/(auth)/signIn'}>
            <Text className="decoration-dashed text-blue-600 mt-10">sign In</Text>
        </Link>
      </View>
     
  )
}

export default signIn
