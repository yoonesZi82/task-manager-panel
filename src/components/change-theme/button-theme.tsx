"use client";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ButtonTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setIcon = () => {
    return theme === "dark" ? <Sun /> : <Moon />;
  };

  return (
    <Button onClick={toggleTheme} shape="circle" mode="icon">
      {setIcon()}
    </Button>
  );
}

export default ButtonTheme;
