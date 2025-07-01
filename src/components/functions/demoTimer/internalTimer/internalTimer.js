"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useRouter } from "next/navigation";
import useInternalFormData from "@/stores/useInternalFormData";
import { digitalFont, counterFont, exerciseFont } from "@/fonts/fonts";
import Image from "next/image";
import { Button } from "../../../ui/button";
import Link from "next/link";
import useInternalInstantFormData from "@/stores/useInstantInternalForm";
const Timer = () => {

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
  setHydrated(true); 
}, []);

  const router = useRouter();
  const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);

  const selectedWorkout = useInternalFormData((state) => state.selectedWorkout);
  const workouts = useInternalFormData((state) => state.workouts);

  const internalInstantFormData = useInternalInstantFormData(
    (state) => state.formData
  );

  const isInternalInstantFormData =
  Object.keys(internalInstantFormData).length > 0;

  const isSelectedWorkoutData = Object.keys(selectedWorkout).length >0;
  // console.log(selectedWorkout)
    
  useEffect(() => {
    if (hydrated &&  !isSelectedWorkoutData) {
      router.push("/dashboard");
    }
  }, [hydrated, isSelectedWorkoutData, router]);




  const [requiredData, setRequiredData] = useState({});

 useEffect(() => {
  if (!hydrated) return;

  if (isInternalInstantFormData) {
    setRequiredData(internalInstantFormData);
  } else if (isSelectedWorkoutData) {
    setRequiredData(selectedWorkout);
  }
}, [hydrated, isInternalInstantFormData, isSelectedWorkoutData, internalInstantFormData, selectedWorkout]);

console.log(requiredData)

  const currentIndex = workouts.findIndex(
    (item) => item.id === requiredData.id
  );

  const gotoNextWorkout = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < workouts.length) {
      setRequiredData(workouts[nextIndex]);
    } else {
      setAllWorkoutsCompleted(true);
    }
  };

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    sets: totalSet,
    duration: duration,
    rest: rest,
    activity: exerciseName,
  } = requiredData;

  const [phase, setPhase] = useState("work");
  const [sets, setSets] = useState(1);
  const [pause, setPause] = useState(false);
  const [completed, setCompleted] = useState(false);

  const rotation = useMotionValue(0);
  const animationStartRef = useRef(null);
  const pauseTimeRef = useRef(0);
  const isPausedRef = useRef(false);
  const [elapsedTime, setElapsedTime] = useState(0); // for display

  const phaseRef = useRef(phase);
  const setsRef = useRef(sets);
  const totalDuration = phase === "work" ? duration : rest;

  useEffect(() => {
    if (requiredData) {
      // Reset the entire timer state
      setSets(1);
      setPhase("work");
      setPause(false);
      setCompleted(false);
      setElapsedTime(0);
      animationStartRef.current = null;
      setHasSubmitted(true);
    }
  }, [requiredData]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    setsRef.current = sets;
  }, [sets]);

  // Pause/resume logic
  useEffect(() => {
    isPausedRef.current = pause;
    if (pause) {
      pauseTimeRef.current = performance.now();
    } else {
      if (pauseTimeRef.current && animationStartRef.current) {
        const pauseDuration = performance.now() - pauseTimeRef.current;
        animationStartRef.current += pauseDuration;
      }
    }
  }, [pause]);

  // Reset when phase or set changes
  useEffect(() => {
    if (!hasSubmitted) return;
    animationStartRef.current = null;
    requestAnimationFrame(() => rotation.set(0));
  }, [phase, sets, hasSubmitted, rotation]);

  useAnimationFrame((t) => {
    if (!hasSubmitted || pause || completed) return;

    if (animationStartRef.current === null) {
      animationStartRef.current = t;
    }

    const elapsed = (t - animationStartRef.current) / 1000;
    const totalPhaseTime = phaseRef.current === "work" ? duration : rest;

    // Update dot
    let angle = (elapsed / totalPhaseTime) * 360;
    angle = Math.min(angle, 360);
    rotation.set(angle);

    // Update display time
    setElapsedTime(elapsed);

    // Handle transition
    if (elapsed >= totalPhaseTime + 0.1) {
      if (phaseRef.current === "work") {
        if (setsRef.current >= totalSet) {
          setCompleted(true);
          return;
        } else {
          setPhase("rest");
        }
      } else {
        setSets((s) => s + 1);
        setPhase("work");
      }

      animationStartRef.current = null;
    }
  });

  const format = (time) => {
    const floored = Math.floor(time);
    const minutes = String(Math.floor(floored / 60)).padStart(2, "0");
    const seconds = String(floored % 60).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };
if (!hydrated || !isSelectedWorkoutData) return null;
  return (
    <>
      <AnimatePresence mode="wait">
        <div className="h-full w-screen flex items-center justify-center">
          <div className="relative w-25 h-25 bottom-[25%] hidden sm:block">
            <Image
              className="absolute transform scale-x-[-1] rotate-20 "
              alt=""
              src="/arm.png"
              fill
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-[90vw] h-[90vw]  sm:h-[25vw] sm:w-[25vw] border-12 bg-[linear-gradient(90deg,rgba(0,130,54,1) 0%, rgba(255,180,67,1) 50%)] border-green-700 rounded-[50%] flex justify-center items-center relative">
              <div className="h-[90%] w-[90%] bg-green-50 rounded-[50%] flex justify-evenly items-center flex-col">
                <p
                  className={`${exerciseFont.className} max-w-[70%] text-center text-xl`}
                >
                  {exerciseName?.slice(0, 10)}
                </p>
                <motion.div
                  key={`${phase}-${sets}`}
                  className="h-[95%] w-[95%] rounded-full absolute flex justify-center will-change-transform"
                  style={{ rotate: rotation }}
                >
                  <div className="bg-green-900 h-3 w-3 rounded-full transform -translate-y-1/2"></div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={phase}
                    className={`text-slate-800 text-7xl md:text-8xl  ${digitalFont.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {format(elapsedTime)}
                  </motion.p>
                </AnimatePresence>

                {phase === "work" ? (
                  sets !== 0 ? (
                    <p className={`text-2xl  ${counterFont.className}`}>
                      {sets} of {totalSet} Sets
                    </p>
                  ) : null
                ) : (
                  <p className={`text-2xl ${counterFont.className}`}>
                    Break {sets}
                  </p>
                )}
              </div>
            </div>

            {!completed ? (
              <Button
                onClick={() => setPause((prev) => !prev)}
                variant={"green"}
              >
                {pause ? "Resume" : "Pause"}
              </Button>
            ) : (
              <div className="flex gap-5">
                <Button variant={"green"} asChild>
                  <Link href={"/dashboard"}> Back </Link>
                </Button>

                {!isInternalInstantFormData &&
                  (allWorkoutsCompleted ? (
                    <Button onClick={gotoNextWorkout} variant={"outline"}>
                      Completed!
                    </Button>
                  ) : (
                    <Button onClick={gotoNextWorkout} variant={"outline"}>
                      Next
                    </Button>
                  ))}
              </div>
            )}
          </div>
          <div className="relative bottom-[25%] h-25 w-25 hidden sm:block">
            <Image
              alt=""
              className="absolute  rotate-340"
              src="/arm.png"
              fill
            />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Timer;
