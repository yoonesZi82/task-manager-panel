"use client";
import React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

function DirectionProviderApp({
  children,
  dir,
}: React.ComponentProps<typeof DirectionProvider>) {
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}

export default DirectionProviderApp;
