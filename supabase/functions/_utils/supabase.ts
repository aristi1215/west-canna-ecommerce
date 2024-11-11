import { createClient } from 'jsr:@supabase/supabase-js@2';
import { stripe } from './stripe.ts';

export const CreateOrRetrieveCustomer = async (req: Request) => {
    const supabaseClient = createClient(
        'https://ywhuimwzwqmhgnamhtfj.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3aHVpbXd6d3FtaGduYW1odGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NDc2MzIsImV4cCI6MjA0NjQyMzYzMn0.LJxAC1fnNhoeW9oUBEVkCbmo3uy0A7av4_vKkcqZXF8',
        {
            global: {
                headers: {Authorization : req.headers.get('Authorization') }
            },
        }
    )  

    const { data: {user} } = await supabaseClient.auth.getUser()

    const {data: profile, error} = await supabaseClient.from('profiles').select('*').eq('id',user.id).single()

    
    if(!user) throw new Error("error finding the current user");

    if(error || !profile){
        throw new Error("Profile not found on database");
    }

    if(profile.stripe_customer_id){
        return profile.stripe_customer_id
    }else{
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {uid: user.id}
        })
        await supabaseClient.from('profiles').update({stripe_customer_id : customer.id}).eq('id',profile.id)
        return customer.id 
    }

    
}