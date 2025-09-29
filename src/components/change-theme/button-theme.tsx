"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ButtonTheme({ shape = "default" }: { shape?: "default" | "circle" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setIcon = () => {
    return theme === "dark" ? <Sun /> : <Moon />;
  };

  return (
    <Button
      onClick={toggleTheme}
      shape={shape}
      mode="icon"
      variant="outline"
      className="!rounded-xl"
    >
      {setIcon()}
    </Button>
  );
}

export default ButtonTheme;
