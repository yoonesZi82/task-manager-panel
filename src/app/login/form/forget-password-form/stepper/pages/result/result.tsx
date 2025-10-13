import { Button } from "@/components/ui/button";
import { useStepper } from "@/context/stepper/StepperContext";
import { BadgeCheck } from "lucide-react";
import React from "react";

function Result() {
  const { setHowPage } = useStepper();
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <BadgeCheck size={100} className="text-green-500" />
      <p className="text-muted-foreground">
        Your password change successfully{" "}
      </p>
      <Button size="md" onClick={() => setHowPage("login")}>
        Go to login
      </Button>
    </div>
  );
}

export default Result;
