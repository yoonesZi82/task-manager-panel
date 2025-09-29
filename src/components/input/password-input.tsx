"use client";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!-\/:-@[-`{-~]/, text: "At least 1 special characters" },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  colors: {
    0: "bg-border",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-amber-500",
    4: "bg-amber-700",
    5: "bg-emerald-500",
  } satisfies Record<StrengthScore, string>,
  texts: {
    0: "Enter a password",
    1: "Weak password",
    2: "Medium password!",
    3: "Strong password!!",
    4: "Very Strong password!!!",
  } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

// Types
type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

function PasswordInput({
  isShowRules = true,
  name = "password",
}: {
  isShowRules?: boolean;
  name?: string;
}) {
  const { control, watch } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);
  const password = watch("password");

  const calculateStrength = useMemo((): PasswordStrength => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));

    return {
      score: requirements.filter((req) => req.met).length as StrengthScore,
      requirements,
    };
  }, [password]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Input
              id="password"
              placeholder="Password ..."
              variant="lg"
              type={isVisible ? "text" : "password"}
              aria-invalid={isShowRules ? calculateStrength.score < 4 : false}
              aria-describedby="password-strength"
              className="bg-background p-2 border-2 focus-within:border-blue-700 rounded-md outline-none w-full transition"
              {...field}
            />
            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="right-0 absolute inset-y-0 flex justify-center items-center w-9 text-muted-foreground/80"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        )}
      />
      <div
        className={cn(
          "mt-3 mb-4 bg-border rounded-full h-1 overflow-hidden",
          !isShowRules && "hidden"
        )}
        role="progressbar"
        aria-valuenow={calculateStrength.score}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        <div
          className={`h-full ${
            STRENGTH_CONFIG.colors[calculateStrength.score]
          } transition-all duration-500`}
          style={{ width: `${(calculateStrength.score / 5) * 100}%` }}
        />
      </div>

      <p
        id="password-strength"
        className={cn(
          "flex justify-between mb-2 font-medium text-sm",
          !isShowRules && "hidden"
        )}
      >
        <span>Must contain:</span>
        <Badge variant="outline" shape="circle">
          {
            STRENGTH_CONFIG.texts[
              Math.min(
                calculateStrength.score,
                4
              ) as keyof typeof STRENGTH_CONFIG.texts
            ]
          }
        </Badge>
      </p>

      <ul
        className={cn("space-y-1.5", !isShowRules && "hidden")}
        aria-label="Password requirements"
      >
        {calculateStrength.requirements.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
            {req.met ? (
              <Check size={16} className="text-emerald-500" />
            ) : (
              <X size={16} className="text-muted-foreground/80" />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PasswordInput;
