import React from "react";
import WhatForm from "./form/what-form";

function page() {
  return (
    <div className="flex justify-between items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full container">
        <WhatForm />
      </div>
      <div className="hidden lg:block bg-secondary w-full h-full">2</div>
    </div>
  );
}

export default page;
