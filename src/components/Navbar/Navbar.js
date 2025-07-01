// /components/Navbar.js
import { createClient } from "@/utils/supabase/server";
import { getProfileByUserID } from "@/lib/providers/getProfileByUserId";

import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();


  let profile = null;
  let providers = null;
  let userId = null;
  if (user) {
   
    profile = await getProfileByUserID(user.id);
      userId  = profile.userId;
    let identities =  user.identities;
    
    providers = identities.map((identity)=>{
      return {
      provider : identity.provider,
      email : identity.email,
        }
    })


    
  }


  return <NavbarClient user={user} profile={profile} providers={providers} userId= {userId} />;
}
