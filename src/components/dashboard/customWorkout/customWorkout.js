import React from "react";
import WorkoutManager from "@/components/dashboard/services/workoutManager";

const CustomWorkout = ({ customWorkouts, setCustomWorkoutData }) => {


  const handleCustomWorkoutChange = (updatedWorkoutList) => {
    setCustomWorkoutData(updatedWorkoutList);
  };

  return (
    <>
      <WorkoutManager
        data={customWorkouts}
         tableMode="custom"
        onCustomWorkoutsChange={handleCustomWorkoutChange}
       
      />
    </>
  );
};

export default CustomWorkout;
