"use client";

import React from "react";
import { useState, useEffect } from "react";
import Timer from "@/components/functions/demoTimer/internalTimer/internalTimer";


import { motion, AnimatePresence } from "framer-motion";


const TimerPage = () => {


   

 

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className=" bg-[#bafff0] flex flex-col h-[100svh] sm:h-screen max-w-screen items-center justify-center overflow-autos"
        >
          <div className="flex flex-col h-[70%] w-screen items-center   justify-center">
            <div className="h-[80vh] sm:h-[40vh] w-screen">{ <Timer />}</div>
      
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TimerPage;
