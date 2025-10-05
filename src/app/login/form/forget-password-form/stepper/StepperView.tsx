import React from "react";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircleIcon } from "lucide-react";
import { useStepper } from "@/context/stepper/StepperContext";
import { Button } from "@/components/ui/button";

function StepperView() {
  const {
    currentStep,
    setCurrentStep,
    steps,
    prev,
    next,
    isPrevDisabled,
    isNextDisabled,
  } = useStepper();
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
      <StepperNav className="gap-3">
        {steps.map((step, index) => {
          return (
            <StepperItem key={index} step={index + 1} className="relative">
              <StepperTrigger
                className="flex flex-col justify-center items-start gap-2.5 grow"
                asChild
              >
                <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent border-2 data-[state=inactive]:border-border size-8 data-[state=completed]:text-white data-[state=inactive]:text-muted-foreground">
                  {step.icon}
                </StepperIndicator>
                <div className="flex flex-col items-start gap-1">
                  <StepperTitle className="font-medium group-data-[state=inactive]/step:text-muted-foreground text-sm text-center">
                    {step.title}
                  </StepperTitle>
                </div>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="top-4 absolute inset-x-0 group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-green-500 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] start-9" />
              )}
            </StepperItem>
          );
        })}
      </StepperNav>
      <StepperPanel className="p-2 border-[1.5px] border-border border-dashed rounded-xl w-full h-full">
        {steps.map((step, index) => (
          <StepperContent
            key={index}
            value={index + 1}
            className="flex justify-center items-center"
          >
            {step.content}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}

export default StepperView;
