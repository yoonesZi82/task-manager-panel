"use client";
import React from "react";
import { StepperProvider } from "@/context/stepper/StepperContext";
import stepsCrateProject from "./steps-item/steps-create-project";
import StepperView from "@/components/stepper-view/StepperView";

function StepperPart() {
  const steps = stepsCrateProject();

  return (
    <StepperProvider steps={steps}>
      <StepperView
        classNameUi={{
          container: "border-none! bg-muted/50",
          header: "border-b border-primary/10 py-1.5",
        }}
      />
    </StepperProvider>
  );
}

export default StepperPart;
