import React from "react";
import StepperView from "./stepper/components/StepperView";
import { StepperProvider } from "@/context/stepper/StepperContext";
import steps from "./stepper/lists/list";

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
