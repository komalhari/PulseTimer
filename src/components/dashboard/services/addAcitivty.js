"use client";
import { Button } from "@/components/ui/button";
import { Loader2, CirclePlus, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddActivity({ onSubmitted, day, tableMode }) {
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("this is dat", data);
    try {
      const endpoint =
        tableMode === "daily" ? "/api/daily_workouts" : "/api/workouts";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...(tableMode === "daily" && { day: day }),
        }),
      });

      const newWorkout = await res.json();

      if (res.ok) {
        onSubmitted(newWorkout);
        setOpen(false);
        reset();
      } else {
        alert("Failed to add workout: " + newWorkout.error);
      }
    } catch (err) {
      console.error("Add workout error:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setLoading(false); // Reset spinner
        }
      }}
    >
      <div>
        <DialogTrigger asChild>
          <CirclePlus className="w-4 h-4 cursor-pointer transition-all duration-200 hover:text-green-700" />
        </DialogTrigger>

        <DialogContent className="sm:max-w-5xl ">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add an activity</DialogTitle>
            </DialogHeader>

            <div className="flex flex-row gap-2 py-1 justify-center items-center flex-wrap">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Activity Name</Label>
                <Input id="" name="" type="text" {...register("activity")} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Total Sets</Label>
                <Input
                  id=""
                  name=""
                  type="number"
                  min="1"
                  required
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
                  {...register("reps")}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">
                Add
                {loading && <Loader2 className="ml-1 h-4 w-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
