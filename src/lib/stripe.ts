import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"
import { supabase } from "../client/client"
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'


export const fetchPaymentSheetParams = async (amount:number) => {

    const { data, error } = await supabase.functions.invoke('payment-sheet', {
      body: { amount },
    })
    
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      return console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      return console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      return console.log('Fetch error:', error.message)
}
    return data
}


//it calls the fetch payment params that are the payment intent created on an edge function and 
//deployed on the cloud. After that intialize the payment sheet but does not displays it

export const initializePaymentSheet = async (amount:number) => {

    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(amount)



    if(!paymentIntent || !ephemeralKey || !customer) {
      throw new Error('Payment initialization failed')
    }


    const { error } = await initPaymentSheet({
      merchantDisplayName: "West Canna BC",
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      defaultBillingDetails: {
          name: 'John Doe',
      },
  })

  console.log('holaaar')

  if (error) {
    console.log('esto fallo men')
      console.error('Error initializing payment sheet:', error)
      throw new Error('Payment sheet initialization failed')
  }

}

//Open the payment sheet 

export const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet()
    if(error) { console.log( error.message); alert(error.stripeErrorCode); return false}
    return true
}