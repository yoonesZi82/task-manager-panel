import React from "react";
import StepperView from "./stepper/StepperView";
import { StepperProvider } from "@/context/stepper/StepperContext";
import steps from "./stepper/stepper-list";

function ForgetPassword() {
  return (
    <StepperProvider steps={steps}>
      <div className="flex justify-center items-center w-full">
        <StepperView />
      </div>
    </StepperProvider>
  );
}

export default ForgetPassword;
