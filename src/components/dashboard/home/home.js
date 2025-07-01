import React from "react";
import { BicepsFlexed } from "lucide-react";
import { energyFont } from "@/fonts/fonts";
import WorkoutManager from "@/components/dashboard/services/workoutManager";
const HomeSection = ({ data, setWorkoutData }) => {
  const handleWorkoutChange = (updatedWorkoutList) => {
    setWorkoutData(updatedWorkoutList);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = [days[new Date().getDay()]];
  return (
    <div className="h-full max-w-[100vw] grid grid-rows-[30%_70%] p-4 overflow-hidden gap-3">


      <div className="flex gap-3 items-baseline justify-center place-self-center">
        <BicepsFlexed className="w-8 h-8 sm:w-12 sm:h-12 rotate-[15deg]" />
        <p className={`${energyFont.className} text-5xl `}>{today}</p>
        <BicepsFlexed className="w-8 h-8 sm:w-12 sm:h-12 scale-x-[-1] rotate-345" />
      </div>

      
      <div className="overflow-y-auto">

      {today.map((day) => {
        const filtered = data.filter((w) => w.day === today[0].toLowerCase());

        return (
          <WorkoutManager
            data={filtered}
            day={day.toLowerCase()}
            tableMode={"daily"}
            onWorkoutsChange={handleWorkoutChange}
            key={day}
          />
        );
      })}
      </div>
    </div>
  );
};

export default HomeSection;
