"use client";

import React, { useEffect } from "react";
import Timer from "@/components/functions/demoTimer/demoTimer";
import useClockStore from "@/stores/useClockStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Demo = () => {
  const router = useRouter();

  const isClicked = useClockStore((state) => state.isClicked);

  useEffect(() => {
    if (isClicked === false) {
      router.replace("/");
    }
  }, [isClicked, router]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className=" bg-[#bafff0] flex flex-col  max-h-[100svh] w-screen items-center justify-center"
        >
          <div className="flex min-h-[100svh] flex-col sm:h-[70%] max-w-screen items-center justify-center">
            <div className="h-[80vh] sm:h-[40vh] w-screen">{isClicked && <Timer />}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Demo;
