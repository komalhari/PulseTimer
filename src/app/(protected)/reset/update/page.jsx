import React from "react";
import { UpdatePasswordForm } from "@/components/auths/updatePassword/updatePassword";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
const UpdatePassword = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  
  if (!session || session.error) {
    redirect("/");
  }

  return (
    <>
      <div className="h-screen w-screen grid place-items-center grid-rows-[70%_30%]">
        <div className="h-1/2 w-1/3">
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
