import { LoginForm } from "@/components/auths/login/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const {  data: {user} , } = await supabase.auth.getUser();
  
  // If user exists, redirect them to dashboard

  if (user && user.role == "authenticated") {
     redirect("/dashboard");
  }

  return (
    <div className="bg-muted flex max-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-screen min-h-svh  sm:w-1/3 p-3 md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
