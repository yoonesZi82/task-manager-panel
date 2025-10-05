"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import LoginForm from "./login-from/login-form";
import RegisterForm from "./register-form/register-form";
import ForgetPassword from "./forget-password-form/forget-password";
import ButtonTheme from "@/components/change-theme/button-theme";
import { StepType } from "../types/step.type";
import { cn } from "@/lib/utils";

function WhatForm() {
  const [step, setStep] = useState<StepType>("login");

  const changeStep = (newStep: StepType) => {
    setStep(newStep);
  };

  return (
    <Card variant="accent" className="rounded-xl w-full max-w-lg">
      <CardHeader>
        <CardHeading>
          <CardTitle>
            {step === "login"
              ? "Login"
              : step === "register"
              ? "Register"
              : "Forget Password"}
          </CardTitle>
        </CardHeading>
        <CardToolbar>
          <ButtonTheme />
        </CardToolbar>
      </CardHeader>
      <CardContent className="max-h-[550px] overflow-y-auto login-box">
        {step === "login" ? (
          <LoginForm />
        ) : step === "register" ? (
          <RegisterForm setStep={setStep} />
        ) : (
          <ForgetPassword />
        )}
      </CardContent>
      <CardFooter
        className={cn(
          "flex lg:flex-row flex-col justify-center items-center",
          step === "password" ? "lg:justify-center" : "justify-between"
        )}
      >
        <div className="flex items-center">
          <span>
            {" "}
            {step === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
          </span>
          <Button
            mode="link"
            underlined="dashed"
            onClick={() => changeStep(step === "login" ? "register" : "login")}
            asChild
          >
            {step === "login" ? <span>Register</span> : <span>Login</span>}
          </Button>
        </div>

        {step !== "password" ? (
          <Button
            mode="link"
            underline="dashed"
            onClick={() => changeStep("password")}
            asChild
          >
            <span>Forget Password</span>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default WhatForm;
