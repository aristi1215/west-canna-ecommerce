import { Redirect } from "expo-router"

const indexAuth = () => {
  return (
    <Redirect href={'/(auth)/signUp'} /> 
  )
}

export default indexAuth