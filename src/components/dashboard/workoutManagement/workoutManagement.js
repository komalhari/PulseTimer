"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WorkoutManager from "@/components/dashboard/services/workoutManager";

const days = [
  {
    full: "Sunday",
    short: "Sun",
  },
  {
    full: "Monday",
    short: "Mon",
  },
  {
    full: "Tuesday",
    short: "Tue",
  },
  {
    full: "Wednesday",
    short: "Wed",
  },
  {
    full: "Thursday",
    short: "Thu",
  },
  {
    full: "Friday",
    short: "Fri",
  },
  {
    full: "Saturday",
    short: "Sat",
  },
];

const today = new Date();
const todayName = days[today.getDay()].full;

export default function WorkoutTabs({ data, setWorkoutData }) {
  const handleWorkoutChange = (updatedWorkoutList) => {
    setWorkoutData(updatedWorkoutList);
  };

  return (
    <div className="flex flex-col">
      <Tabs defaultValue={todayName} className="flex flex-col gap-10 md:gap-5 ">
        <TabsList className="grid grid-cols-7 ">
          {days.map((day) => (
            <TabsTrigger key={day.full} value={day.full}>
              <span className="sm:block hidden"> {day.full} </span>
              <span className="sm:hidden block"> {day.short} </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="overflow-y-auto">
          {days.map((day) => {
            const filtered = data.filter(
              (w) => w.day === day.full.toLowerCase()
            );

            return (
              <TabsContent
                key={day.full}
                value={day.full}
                className="max-w-[95%]"
              >
                <WorkoutManager
                  data={filtered}
                  day={day.full.toLowerCase()}
                  tableMode={"daily"}
                  onWorkoutsChange={handleWorkoutChange}
                />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
