import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

function LoginButton() {
  return (
    <Button variant="secondary" asChild>
      <Link href="/login">
        <User />
        Login
      </Link>
    </Button>
  );
}

export default LoginButton;
