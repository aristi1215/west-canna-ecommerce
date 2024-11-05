import { View, Pressable, Text } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Redirect href={"/(admin)/"} />
      <Link href={'/(auth)'} asChild>
        <Pressable>
            <Text className='text-white text-center'>
                User
            </Text>
        </Pressable>
      </Link>
      <Link href={'/(auth)'} asChild>
        <Pressable>
            <Text className='text-white text-center'>
                Admin
            </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default index;