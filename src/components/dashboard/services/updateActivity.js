"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export function UpdateActivity({
  formData,
  formTrigger,
  onUpdated,
  onClose,
  tableMode,
  day,
}) {
  const [isloading, setIsLoading] = useState(false);

  const safeFormData = formData || {};

  const { activity, duration, rest, reps, sets } = safeFormData;

  const [open, setOpen] = useState(!!formData);

  const schema = yup.object().shape({
    activity: yup.string().required("This is a required field"),
    sets: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .required("This is a required field"),
    reps: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .required("This is a required field"),
    duration: yup
      .number()
      .positive()
      .min(1)
      .required("This is a required field"),
    rest: yup.number().positive().min(0).required("This is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const currentText = watch("activityName", "");
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      setOpen(true);
      reset(formData);
    }
  }, [formData, reset, formTrigger]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const endpoint =
      tableMode === "daily"
        ? `/api/daily_workouts/${data.id}`
        : `/api/workouts/${data.id}`;

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({...data,  ...(tableMode === "daily" && {day:day}) }),
      });

      const updatedWorkout = await res.json();

      if (res.ok) {
        onUpdated(updatedWorkout);
        setOpen(false);
        reset();
      } else {
        alert("Failed to update workout: " + newWorkout.error);
      }
    } catch (err) {
      console.error("Update workout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          reset();
          onClose?.();
        }
      }}
    >
      <div>
        <DialogContent className="sm:max-w-5xl ">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update this activity</DialogTitle>
            </DialogHeader>

            <div className="flex flex-row gap-2 py-1 justify-center items-center flex-wrap">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Activity Name</Label>
                <Input
                  id=""
                  name=""
                  type="text"
                  defaultValue={activity}
                  {...register("activity")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Total Sets</Label>
                <Input
                  id=""
                  name=""
                  type="number"
                  min="1"
                  required
                  defaultValue={sets}
                  {...register("sets")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Duration / Set</Label>
                <Input
                  id=""
                  name=""
                  type="number"
                  min="1"
                  required
                  defaultValue={duration}
                  {...register("duration")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Rest / Set</Label>
                <Input
                  id=""
                  name=""
                  type="number"
                  min="0"
                  required
                  defaultValue={rest}
                  {...register("rest")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Reps / Set</Label>
                <Input
                  id=""
                  name=""
                  type="number"
                  min="1"
                  required
                  defaultValue={reps}
                  {...register("reps")}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">
                Update
                {isloading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
