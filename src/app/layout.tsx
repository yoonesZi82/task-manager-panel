import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import DirectionProviderApp from "@/providers/direction-provider";
import Layout from "@/components/layout/layout-web/Layout";
import QueryProvider from "@/providers/query-provider";
import NextAuthProvider from "@/providers/nextauth-provider";
import { ToastProvider } from "@/components/ui/base-toast";
import AuthWatcher from "@/components/auth/auth-whatcher";

const robotoSans = Roboto({
  variable: "----font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "task-manager",
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
      <body className={`${robotoSans.variable} antialiased`}>
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
