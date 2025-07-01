"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "@/lib/actions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TriangleAlert } from 'lucide-react';
import { toast } from "sonner";
import {
  signInWithFacebook,
  signInWithGoogle,
  signInWithSpotify,
} from "@/lib/actions";
import { useSearchParams } from "next/navigation";
export function LoginForm(className, ...props) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [captchaToken, setCaptchaToken] = useState();
  const schema = yup.object().shape({
    Email: yup.string().email("Invalid Email").required("Email is required"),
    Password: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ Email, Password }) => {
    try {
      const login = await LogIn(Email, Password, captchaToken);
      console.log("this is login", login);
    } catch (e) {
      console.log("Failed to Login:", e);
    }
  };

  useEffect(()=>{
message && toast.warning(message);
  },[message])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your PluseTimer Account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                  {...register("Email")}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/reset"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("Password")}
                />
              </div>
              <Turnstile
                className="grid gap-2 place-self-center"
                siteKey="0x4AAAAAABgpMCIZeyXAF_Gv"
                onSuccess={(token) => {
                  setCaptchaToken(token);
                  console.log(token);
                }}
              />

      
              

              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={signInWithSpotify}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m4.52-2.016c3.4-1.31 7.279-.844 10.308 1.22a.75.75 0 0 0 .844-1.24c-3.43-2.336-7.825-2.87-11.692-1.38a.75.75 0 1 0 .54 1.4m1.3 3.104c2.515-.923 5.275-.635 7.372.901a.75.75 0 0 0 .886-1.21c-2.544-1.864-5.84-2.176-8.775-1.1a.75.75 0 0 0 .517 1.41m6.292 3.622a.75.75 0 0 0 .826-1.252c-2.004-1.324-4.48-1.668-6.744-.771a.75.75 0 1 0 .552 1.394c1.773-.702 3.737-.447 5.366.629"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Spotify</span>
                </Button>
                <Button
                  onClick={signInWithGoogle}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.183 2.75c-3.683 0-6.902 2.031-8.419 5.088a9.05 9.05 0 0 0 0 8.325c1.517 3.056 4.736 5.087 8.419 5.087 2.54 0 4.72-.827 6.244-2.224 2.484-2.173 3.185-5.599 2.658-8.688a.25.25 0 0 0-.246-.208h-8.656a.25.25 0 0 0-.25.25v3.33c0 .138.112.25.25.25h4.768c-.166.74-.687 1.747-1.685 2.423l-.008.005c-.685.502-1.735.852-3.075.852-2.936 0-5.275-2.455-5.275-5.33 0-2.783 2.472-5.24 5.275-5.24 1.67 0 2.72.683 3.429 1.29a.25.25 0 0 0 .337-.011l2.578-2.52a.25.25 0 0 0-.011-.368c-1.609-1.388-3.784-2.311-6.333-2.311" />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button
                  onClick={signInWithFacebook}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M14.5 2.75c-2.861 0-5.25 2.389-5.25 5.25v1.75H6.5a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25h2.75V21c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-6.75h2.75a.25.25 0 0 0 .242-.19l1-4a.25.25 0 0 0-.242-.31h-3.75V8a.76.76 0 0 1 .75-.75h3a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Facebook</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
