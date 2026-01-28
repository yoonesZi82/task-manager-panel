"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function AuthWatcher() {
  const toast = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (
      (session as any)?.error === "RefreshTokenExpired" ||
      (session as any)?.error === "InvalidRefreshToken"
    ) {
      toast.add({
        title: "Warning",
        description: "Your session has expired. Please login again.",
        type: "warning",
      });
      setTimeout(() => {
        signOut({ redirect: true, callbackUrl: "/login" });
      }, 3000);
    }
  }, [session, status]);

  return null;
}
