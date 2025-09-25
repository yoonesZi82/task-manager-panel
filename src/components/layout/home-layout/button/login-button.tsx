import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

function LoginButton() {
  return (
    <Button variant="secondary">
      <User />
      Login
    </Button>
  );
}

export default LoginButton;
