"use client";
import * as React from "react";
import ButtonTheme from "@/components/change-theme/button-theme";
import AuthButton from "../button/auth-button";
import MenuList from "./menu-list";
import BurgerMenu from "./burger-menu";
import { useSession } from "next-auth/react";
import LoginButton from "../button/login-button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const { data: session, status } = useSession();

  // Avoid SSR/Client mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const renderAuthButton = () => {
    if (!mounted || status === "loading")
      return <Skeleton className="w-24 h-8" />;
    return session ? <AuthButton /> : <LoginButton />;
  };

  return (
    <section className="w-full container">
      <div className="top-0 right-0 left-0 sticky bg-secondary/50 mt-4 py-4 rounded-xl w-full">
        <div className="flex justify-between items-center container">
          {renderAuthButton()}
          <MenuList />
          <div className="hidden lg:block">
            <ButtonTheme />
          </div>
          <div className="lg:hidden block">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
