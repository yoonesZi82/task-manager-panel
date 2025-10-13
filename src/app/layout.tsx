import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import DirectionProviderApp from "@/providers/direction-provider";
import Layout from "@/components/layout/layout-web/Layout";
import QueryProvider from "@/providers/query-provider";
import NextAuthProvider from "@/providers/nextauth-provider";
import { ToastProvider } from "@/components/ui/base-toast";
import AuthWatcher from "@/components/auth/auth-whatcher";
import { Roboto } from "@/configs/fonts";
import { cn } from "@/lib/utils";

const fonts = {
  en: Roboto,
};

export const metadata: Metadata = {
  title: "Task Manger",
  description: "The task manger Application",
};

const dir: "rtl" | "ltr" = "ltr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir={dir} lang={dir === "rtl" ? "fa" : "en"} suppressHydrationWarning>
      <body className={cn("antialiased", fonts.en.variable)}>
        <NextAuthProvider>
          <DirectionProviderApp dir={dir}>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Layout>
                  <ToastProvider>
                    <AuthWatcher />
                    {children}
                  </ToastProvider>
                </Layout>
              </ThemeProvider>
            </QueryProvider>
          </DirectionProviderApp>
        </NextAuthProvider>
      </body>
    </html>
  );
}
