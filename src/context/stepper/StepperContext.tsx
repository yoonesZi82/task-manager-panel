"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import StepType from "./types/step.type";

type PageType = "login" | "register" | "password";

interface StepperContextType {
  steps: StepType[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  data: any;
  setData: (data: any) => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  howPage: PageType;
  setHowPage: (page: PageType) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

interface StepperProviderProps {
  children: ReactNode;
  steps: StepType[];
}

export function StepperProvider({ children, steps }: StepperProviderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<any>(null);
  const [howPage, setHowPage] = useState<PageType>("login");

  const totalSteps = steps?.length ?? 1;

  const next = () =>
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prev = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  const reset = () => setCurrentStep(1);

  const { isNextDisabled, isPrevDisabled } = useMemo(
    () => ({
      isNextDisabled: currentStep >= totalSteps,
      isPrevDisabled: currentStep <= 1,
    }),
    [currentStep, totalSteps]
  );

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        next,
        prev,
        reset,
        data,
        setData,
        isNextDisabled,
        isPrevDisabled,
        howPage,
        setHowPage,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
}
