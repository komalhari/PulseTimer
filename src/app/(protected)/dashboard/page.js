
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import  prisma  from "@/utils/prisma";
import DashboardMain from "@/components/dashboard/dashboardMain";
import { getProfileByUserID } from "@/lib/providers/getProfileByUserId";

const Dashboard = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/");
  }

 const customWorkouts = await prisma.workout.findMany({
  where: { userId: user.id },
  });

   const workouts = await prisma.dailyWorkout.findMany({
  where: { userId: user.id },
  });
  

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


  return (
    <>
     <DashboardMain user={user} profile={profile} providers={providers} userId= {userId}  data= {workouts} customWorkouts={customWorkouts}/>
    </>
  );
};

export default Dashboard;
