import React from "react";
import Navbar from "./navbar-menu/navbar";
import Footer from "./footer/Footer";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 w-full">{children}</section>
      <Footer />
    </main>
  );
}

export default HomeLayout;
