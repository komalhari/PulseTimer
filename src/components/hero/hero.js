"use client";
import CreateWorkout from "../forms/createWorkout/CreateWorkout";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import useClockStore from "@/stores/useClockStore";
import { usePathname } from "next/navigation";
import useRedirect from "@/stores/useRedirect";
import { inter } from "@/fonts/fonts";
const Hero = () => {
  const pathname = usePathname();
  console.log(pathname, !pathname === "/");
  const isClicked = useClockStore((state) => state.isClicked);

  const redirect = useRedirect((state) => state.redirect);
  console.log(redirect);
  const [hideHero, setHideHero] = useState(false);

  useEffect(() => {
    if (isClicked && pathname != "/") {
      const timeout = setTimeout(() => setHideHero(true), 5000);
      return () => clearTimeout(timeout); // Cleanup on route change
    } else {
      setHideHero(false); // Reset when navigating to a different path
    }
  }, [pathname, isClicked]);

  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setClick(true);
    setTimeout(() => setVisible(true), 500);
  };

  useEffect(() => {
    if (redirect) {
      handleClick();
    }
  }, [redirect]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hideHero && (
          <motion.div
            key={isClicked}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-[90svh]  max-w-[100vw] grid  grid-rows-[15%_85%] sm:place-items-center p-4 overflow-hidden bg-[#bafff0]    
            sm:grid-rows-[30%_60%_10%]"
          >

            <p className={`sm:col-span-2  place-self-center text-2xl text-center md:text-3xl font-bold tracking-tight text-gray-900 ${inter.className}`}>
              Seamlessly Plan, Manage & Save Your Workouts!
            </p>

            <div className="max-h-full w-full grid grid-rows-[70%_30%] sm:grid-rows-1 sm:grid-cols-2 place-items-center"  >


              <div className="h-full w-full row-start-2 sm:row-start-1 md:w-2/3 flex flex-col items-center justify-center gap-5 sm:flex-row">
              
                <div className="flex flex-col flex-wrap gap-4 order-3 sm:order-2">
                  <p className="text-sm  sm:text-lg md:text-xl text-gray-700">
                    <span className="font-semibold text-black">PulseTimer</span>{" "}
                    is your smart workout companion. Plan daily workouts, {" "}train instantly,{" "} and watch your progress grow — all without the
                    clutter!
                  </p>

                  <div className="flex justify-center gap-7 ">
                    <Button onClick={handleClick}>Demo</Button>
                    <Button variant="outline" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>

              
              <div className="max-w-full">
   
                {redirect ||
                  (!visible && (
                    <motion.div
                      animate={{
                        x: click ? "150vh" : 0,
                        transition: {
                          duration: 0.5,
                          ease: easeInOut,
                        },
                      }}
                    >
                      <div className="relative w-[200px] h-[200px] sm:w-[200px] sm:h-[200px]">
                        <Image
                          alt=""
                          src="/boy.svg"
                          fill
                          className="object-contain"
                          sizes="(min-width: 640px) 200px, 100px"
                        />
                      </div>
                    </motion.div>
                  ))}

                {visible && (
                  <motion.div
                    className="sm:row-span-2 h-full w-full flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: easeInOut,
                      },
                    }}
                  >
                    <CreateWorkout isClicked={click} />
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
