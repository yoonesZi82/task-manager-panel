"use client";
import * as React from "react";
import ButtonTheme from "@/components/change-theme/button-theme";
import AuthButton from "../button/auth-button";
import MenuList from "./menu-list";
import BurgerMenu from "./burger-menu";

export default function Navbar() {
  return (
    <section className="w-full container">
      <div className="top-0 right-0 left-0 sticky bg-secondary/50 mt-4 py-4 rounded-xl w-full">
        <div className="flex justify-between items-center container">
          <AuthButton />
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
