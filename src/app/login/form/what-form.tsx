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
import React from "react";
import LoginForm from "./login-from/login-form";
import RegisterForm from "./register-form/register-form";
import ForgetPassword from "./forget-password-form/forget-password";
import ButtonTheme from "@/components/change-theme/button-theme";
import { cn } from "@/lib/utils";
import { useStepper } from "@/context/stepper/StepperContext";

function WhatForm() {
  const { howPage, setHowPage } = useStepper();

  return (
    <Card variant="accent" className="rounded-xl w-full max-w-lg">
      <CardHeader>
        <CardHeading>
          <CardTitle>
            {howPage === "login"
              ? "Login"
              : howPage === "register"
              ? "Register"
              : "Forget Password"}
          </CardTitle>
        </CardHeading>
        <CardToolbar>
          <ButtonTheme />
        </CardToolbar>
      </CardHeader>
      <CardContent className="max-h-[550px] overflow-y-auto login-box">
        {howPage === "login" ? (
          <LoginForm />
        ) : howPage === "register" ? (
          <RegisterForm />
        ) : (
          <ForgetPassword />
        )}
      </CardContent>
      <CardFooter
        className={cn(
          "flex lg:flex-row flex-col justify-center items-center",
          howPage === "password" ? "lg:justify-center" : "lg:justify-between"
        )}
      >
        <div className="flex items-center">
          <span>
            {" "}
            {howPage === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
          </span>
          <Button
            mode="link"
            underlined="dashed"
            onClick={() =>
              setHowPage(howPage === "login" ? "register" : "login")
            }
            asChild
          >
            {howPage === "login" ? <span>Register</span> : <span>Login</span>}
          </Button>
        </div>

        {howPage !== "password" ? (
          <Button
            mode="link"
            underline="dashed"
            onClick={() => setHowPage("password")}
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
