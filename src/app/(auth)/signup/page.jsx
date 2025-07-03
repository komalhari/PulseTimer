import { SignUpForm } from "@/components/auths/signup/signup-form";

export default async function SignUpPage() {
 
//
  return (
   <div className="bg-muted flex max-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-screen min-h-svh sm:w-1/3 p-3 md:max-w-3xl flex items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  );
}
