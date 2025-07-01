// app/api/auth/disconnect/route.js
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";



 
export async function POST(req) {
    const supabase = await createClient();
  const {data: identities} = await supabase.auth.getUserIdentities();

  
const { provider }  = await req.json();

  const authIdentity =  identities.identities.find((identity) => identity.provider === provider);

  const { error } = await supabase.auth.unlinkIdentity(authIdentity);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }



  return NextResponse.json({ success: true });
}
