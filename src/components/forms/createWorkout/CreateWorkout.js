"use client";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { exerciseFont } from "@/fonts/fonts";
import useClockStore from "@/stores/useClockStore";
import useFormData from "@/stores/useFormStore";
import useInternalInstantFormData from "@/stores/useInstantInternalForm";
import { useRouter } from "next/navigation";

const CreateWorkout = ({ isClicked, location }) => {
  const setClickState = useClockStore((state) => state.setIsClicked);
  const setFormData = useFormData((state) => state.setFormData);
  const setInternalInstantFormData = useInternalInstantFormData(
    (state) => state.setInternalInstantFormData
  );

  const router = useRouter();

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
    rest: yup
      .number()
      .positive()
      .min(0)
      .required("This is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const currentText = watch("activityName", "");

  const onSubmit = (data) => {
    console.log("Form submitted!");

    if (location === "internal") {
      setInternalInstantFormData(data);
      router.push("/timer");
    } else {
      setClickState(true);
      setFormData(data);
      router.push("/demo");
    }
  };
  console.log("errors", errors);

  return (
    <>
      <motion.div className="relative w-[90%] h-[100%] sm:w-[90%] sm:max-h-[100%] max-w-md p-7 border-none flex  flex-col items-center ">
        <motion.svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="-2 -2 100 100"
          preserveAspectRatio="none"
        >
          <motion.rect
            width="96"
            height="96"
            rx="1"
            ry="1"
            fill="#fff"
            stroke="#000000"
            strokeWidth="0.5"
            strokeDasharray="400"
            strokeDashoffset="0"
            animate={{ strokeDashoffset: isClicked ? -400 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.svg>
        {isClicked && (
          <motion.svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="-2 -2 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="borderGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#008236" />
                <stop offset="100%" stopColor="#00B265" />
              </linearGradient>
            </defs>
            <motion.rect
              width="96"
              height="96"
              rx="1"
              ry="1"
              fill="none"
              stroke="url(#borderGradient)"
              strokeWidth="0.5"
              strokeDasharray="400"
              strokeDashoffset="400"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
        <div className="relative z-2">
          <div className="flex items-center justify-between">
            <p
              className={` ${exerciseFont.className}   text-xl text-[#111827]`}
            >
              Instant Workout
            </p>
            <p> ⚡</p>
          </div>
          <hr className="mt-1  border-black mb-5" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 grid-rows-3 gap-3 place-items-center">
              <div className="col-span-2 w-full">
                <input
                  className="max-w-full w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus: focus:border-green-700"
                  type="text"
                  name=""
                  onChange={(e) => setCurrentText(e.target.value)}
                  maxLength="10"
                  id=""
                  required
                  placeholder="Name eg, PushUp"
                  {...register("activity")}
                />
                {/* <p className="text-sm text-gray-500 mt-1">
                {10 - currentText.length} characters remaining
              </p> */}
                <p className="text-red-800 text-xs">
                  {errors.activity?.message}
                </p>
              </div>

              <div className="width-full">
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus: focus:border-green-700"
                  type="number"
                  min="1"
                  name=""
                  id=""
                  required
                  placeholder="No of Sets"
                  {...register("sets")}
                />

                <p className="text-red-800 text-xs">
                  {errors.sets?.message}
                </p>
              </div>

              <div className="w-full">
                <input
                  className="max-w-full border p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-green-700 focus: focus:border-green-700"
                  type="number"
                  min="1"
                  name=""
                  id=""
                  required
                  placeholder="Estimated Reps/Set"
                  {...register("reps")}
                />
                <p className="text-red-800 text-xs">
                  {errors.reps?.message}
                </p>
              </div>

              <div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-md   focus:outline-none focus:ring-2  focus:ring-green-700 focus: focus:border-green-700"
                  type="number"
                  required
                  name=""
                  min="1"
                  id=""
                  placeholder="Duration/Set (in sec)"
                  {...register("duration")}
                />
                <p className="text-red-800 text-xs">
                  {errors.duration?.message}
                </p>
              </div>

              <div>
                <input
                  className="w-full  p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus: focus:border-green-700"
                  type="number"
                  required
                  name=""
                  min="0"
                  id=""
                  placeholder="Rest/Set (in sec)"
                  {...register("rest")}
                />
                <p className="text-red-800 text-xs">
                  {errors.rest?.message}
                </p>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.9 }}
                className="col-span-2 w-2/3 p-2 bg-green-700 text-white rounded-md hover:bg-green-700 focus:outline-none"
              >
                Start ️‍🔥
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default CreateWorkout;
