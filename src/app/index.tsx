import { Pressable, Text, Image, ImageBackground} from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../supabase/client';
import { useAuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';

const index = () => {
 
  const { loading } = useAuthContext()

  if(loading){
    return <ActivityIndicator />
  }
  
  const handleSignOut = () => {
    supabase.auth.signOut()
    alert('Signed Out')
  }

  return (
    <ImageBackground
    source={require('../../assets/images/bg-index.jpg')}
    resizeMode='cover'
    className='flex-1 justify-center items-center p-10 gap-5'
    >
      <Image source={require('../../assets/images/west-canna-logo.png')} className='w-40 h-40' />
      <Link href={'/(auth)/signIn'} asChild>
        <Pressable className='bg-[#087c6c] rounded-full w-[80%] items-center justify-center h-[5rem]'>
            <Text className='text-center text-white'>
                Sign In
            </Text>
        </Pressable>
      </Link>
        <Pressable className='bg-[#087c6c] rounded-full w-[80%] items-center justify-center h-[5rem]' onPress={handleSignOut}>
            <Text className='text-center text-white'>
                Sign Out
            </Text>
        </Pressable>
    </ImageBackground>
  );
};

export default index;