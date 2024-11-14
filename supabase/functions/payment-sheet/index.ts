import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';
import { CreateOrRetrieveCustomer } from '../_utils/supabase.ts';


serve(async (req: Request) => {
  try {
    const { amount } = await req.json();

    const customer = await CreateOrRetrieveCustomer(req)

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer},
      {apiVersion: '2020-08-27' }
    )

    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer,
    });
    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      ephemeralKey: ephemeralKey.secret,
      customer
    };
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});