import { Redirect, Stack } from 'expo-router'
import { useAuthContext } from '@/src/context/AuthContext'

const AuthLayout = () => {

  const {profile, isAdmin} = useAuthContext()
  
  if(profile && isAdmin) return <Redirect href={'/(admin)/menu'} />
  if(profile && !isAdmin) return <Redirect href={'/(user)/menu'} />

  return (
    <Stack >
        <Stack.Screen name='signIn' options={{title: 'Sign In', headerTitleAlign: 'center'}} />
        <Stack.Screen name='signUp' options={{title: 'Sign Up', headerTitleAlign: 'center'}} />
    </Stack>
  )
}

export default AuthLayout