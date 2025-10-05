"use client";
import React from "react";
import { StepperContent, StepperPanel } from "@/components/ui/stepper";
import { useStepper } from "@/context/stepper/StepperContext";
import { motion, AnimatePresence, scale } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function StepperContentUi() {
  const { steps, currentStep, prev } = useStepper();

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <StepperPanel className="relative p-4 border-[1.5px] border-border border-dashed rounded-xl w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={currentStep}>
        {steps.map((step, index) =>
          index + 1 === currentStep ? (
            <motion.div
              key={index}
              custom={currentStep}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="flex justify-center items-center w-full h-full"
            >
              <StepperContent
                value={index + 1}
                className="flex flex-col gap-2 w-full"
              >
                {currentStep > 1 ? (
                  <div className="flex w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prev}
                      className="group"
                    >
                      <ArrowLeft className="transition-all group-hover:-translate-x-1 duration-300" />
                      back
                    </Button>
                  </div>
                ) : null}
                <div className="w-full">{step.content}</div>
              </StepperContent>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </StepperPanel>
  );
}

export default StepperContentUi;
