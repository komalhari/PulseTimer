import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteUser } from "@/lib/actions";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const Advacned = (userId) => {
  const [open, setOpen] = useState(false);
  const schema = yup.object().shape({
    Confirm: yup
      .string()
      .oneOf(["CONFIRM"], "You must type CONFIRM exactly")
      .required("Confirmation is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });
  const liveValue = watch("Confirm");
  const onSubmit = () => {
    DeleteUser(userId);
  };

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Delete your Account </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              Proceed To Delete your PulseTimer Account
            </p>
            <Button onClick={() => setOpen(true)}>Delete</Button>
          </CardContent>
        </Card>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="grid p-3 gap-3">
                  Once deleted, your account can never be recovered!
                  <Input
                    type="text"
                    placeholder="Type CONFIRM to Delete"
                    {...register("Confirm")}
                  />
                 
                </AlertDialogDescription>
                 {errors.Confirm?.message && (
                    <div className="text-red-800 text-xs">
                      {errors.Confirm?.message}
                    </div>
                  )}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                {liveValue === "CONFIRM" ? (
                  <AlertDialogAction type="submit">
                    I understand
                  </AlertDialogAction>
                ) : (
                  <Button variant="secondary"> I understand </Button>
                )}
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Advacned;
