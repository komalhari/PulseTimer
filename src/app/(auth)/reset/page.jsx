import React from "react";
import { ResetForm } from "@/components/auths/reset/reset";

const ResetPassword = () => {
  return (
    <>
      <div className="h-screen w-screen grid place-items-center grid-rows-[70%_30%]">
        <div className="h-1/2 w-1/3">
          <ResetForm />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
