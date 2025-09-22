"use client";
import React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

function DirectionProviderApp({
  children,
}: React.ComponentProps<typeof DirectionProvider>) {
  return <DirectionProvider dir="rtl">{children}</DirectionProvider>;
}

export default DirectionProviderApp;
