import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
} from "@/components/ui/card";
import { useStepper } from "@/context/stepper/StepperContext";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";

function ChoseTypeProject() {
  const { next } = useStepper();

  const planesList = [
    {
      id: 1,
      title: "Free Plane",
      cover: null,
      features: ["Lorem ipsum dolor sit amet"],
      cons: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      price: {
        month: "0",
        year: "0",
      },
    },
    {
      id: 2,
      title: "Single Plane",
      cover: null,
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      cons: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
      price: {
        month: "8.99",
        year: "89.99",
      },
    },
    {
      id: 3,
      title: "Team Plane",
      cover: null,
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      cons: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
      price: {
        month: "16.99",
        year: "140.99",
      },
    },
  ];

  return (
    <div className="flex justify-center items-center gap-4 w-full h-full">
      {planesList.map((plan) => (
        <Card
          variant="accent"
          className="rounded-xl w-full max-w-lg h-full"
          key={plan.id}
          onClick={next}
        >
          <CardHeader>
            <CardHeading>
              <CardTitle> {plan.title} </CardTitle>
            </CardHeading>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                <p className="text-sm"> {feature} </p>
              </div>
            ))}
            {plan.cons.map((con, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <X size={14} className="text-destructive" />
                <p className="text-sm"> {con} </p>
              </div>
            ))}
          </CardContent>
          <CardFooter
            className={cn(
              "flex lg:flex-row flex-col justify-center items-center"
            )}
          >
            <Button className="rounded-lg w-full"> Chose Plane </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ChoseTypeProject;
