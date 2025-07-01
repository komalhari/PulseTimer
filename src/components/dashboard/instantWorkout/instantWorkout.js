import React from "react";
import CreateWorkout from "@/components/forms/createWorkout/CreateWorkout";
import { energyFont } from "@/fonts/fonts";
const InstantWorkout = () => {
  return (
    <div className="h-[100%] w-[100%] grid grid-rows-[20%_80%] place-items-center ">
      <p className={`${energyFont.className} text-5xl text-center`}>
        Run a Quick Workout
      </p>

      <div className=" w-[100%]">
        <div className="flex justify-center">
          <CreateWorkout location="internal" isClicked={true} />
        </div>
      </div>
    </div>
  );
};

export default InstantWorkout;
