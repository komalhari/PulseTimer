"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "../../ui/card";
import { resetPassword } from "@/lib/actions";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ResetForm({ className, ...props }) {

  const [captchaToken, setCaptchaToken] = useState();
  const [emailStatus, setEmailStatus] = useState(false);
  const [click, setClick] = useState(false);

  // Form validation
  const schema = yup.object().shape({
    Email: yup
      .string("Invalid Email")
      .email("Invalid Email")
      .required("Email is required"),
  });
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit({ Email }) {
    try {
      const reset = await resetPassword(Email, captchaToken);
      if(reset.success){
       setEmailStatus(true)
      }
    
       } catch {
      console.log(error);
    }
  }

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form className="p-5 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-bold">
                  Reset your PulseTimer Password
                </h1>
              </div>
              <div className="flex flex-col gap-6">
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
                <Turnstile
                  className="grid gap-2 place-self-center"
                  siteKey="0x4AAAAAABgpMCIZeyXAF_Gv"
                  onSuccess={(token) => {
                    setCaptchaToken(token);
                    console.log(token);
                  }}
                />

                {emailStatus ? (
                  <Button  variant={"emailSent"} onClick={()=>setClick(true)} type="button" className="w-full">
                  Verification Link Sent! {click && <Loader2 className="animate-spin" />}
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Send Password Verification Link
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
