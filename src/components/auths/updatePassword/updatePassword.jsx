"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "../../ui/card";
import { updatePassword } from "@/lib/actions";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function UpdatePasswordForm({ className, ...props }) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  useEffect(() => {
    message && toast.warning(message);
  }, [message]);

  const router = useRouter();
  const schema = yup.object().shape({
    Password: yup
      .string()
      .min(10, "Password must be at least 10 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    RetypedPassword: yup
      .string()
      .required("Retype your password")
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit({ Password }) {
    if (Password) {
      const newPassword = await updatePassword(Password);

      if (newPassword?.error) {
        router.push("/reset?message=Failed+To+Update+Your+Password");
      } else {
        router.replace("/login");
      }
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
                <h1 className="text-xl font-bold">Password Update Form</h1>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">Create a password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Include [A-Z] [a-z] [0-9] [!@#$%^&*]"
                    required
                    {...register("Password")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Retype your password</Label>
                  <Input
                    id="revalidatePassword"
                    type="password"
                    required
                    {...register("RetypedPassword")}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Password
                </Button>
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
