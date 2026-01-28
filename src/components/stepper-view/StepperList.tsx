import React from "react";
import {
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useStepper } from "@/context/stepper/StepperContext";

function StepperList() {
  const { steps } = useStepper();

  return (
    <StepperNav className="gap-3">
      {steps.map((step, index) => {
        return (
          <StepperItem key={index} step={index + 1} className="relative">
            <StepperTrigger
              className="flex flex-col justify-center items-start gap-2.5 grow"
              asChild
            >
              <StepperIndicator className="data-[state=completed]:bg-primary data-[state=inactive]:bg-transparent border-2 data-[state=inactive]:border-border size-8 data-[state=completed]:text-white data-[state=inactive]:text-muted-foreground">
                {step.icon}
              </StepperIndicator>
              {step.title ? (
                <div className="flex flex-col justify-center items-start gap-1">
                  <StepperTitle className="font- group-data-[state=inactive]/step:text-muted-foreground text-xs text-center">
                    {step.title}
                  </StepperTitle>
                </div>
              ) : null}
            </StepperTrigger>
            {steps.length > index + 1 && (
              <StepperSeparator className="top-4 absolute inset-x-0 group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] start-9" />
            )}
          </StepperItem>
        );
      })}
    </StepperNav>
  );
}

export default StepperList;
