import localFont from "next/font/local";

const Roboto = localFont({
  src: [
    {
      path: "../app/fonts/En/Roboto-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../app/fonts/En/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-roboto-sans",
  display: "swap",
});

export { Roboto };
