import React from "react";
import { Stepper } from "@/components/ui/stepper";
import { Check, LoaderCircleIcon } from "lucide-react";
import { useStepper } from "@/context/stepper/StepperContext";
import StepperList from "./StepperList";
import StepperContentUi from "./StepperContentUi";

function StepperView({
  classNameUi,
}: {
  classNameUi?: { container?: string; header?: string };
}) {
  const { currentStep, setCurrentStep } = useStepper();
  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      defaultValue={currentStep}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8"
    >
      <StepperList />
      <StepperContentUi classNameUi={classNameUi} />
    </Stepper>
  );
}

export default StepperView;
