import React from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

function CustomButton({
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn("relative", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />}
      {children}
    </Button>
  );
}

export default CustomButton;
