"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function page() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <p>سلام {session.user?.name}</p>
        <button onClick={() => signOut()}>خروج</button>
      </>
    );
  }
  return (
    <div className="flex flex-col">
      <button onClick={() => signIn("github")}>ورود با گیت‌هاب</button>
      <button onClick={() => signIn("google")}>ورود با گوگل</button>
    </div>
  );
}

export default page;
