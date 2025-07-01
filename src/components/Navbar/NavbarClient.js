"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
export default function NavbarClient({ user, profile, providers, userId }) {


  return (
    <div className="h-[10vh] w-screen grid grid-cols-2 place-items-center">
      <p className="text-2xl"> PulseTimer </p>

      <div className="w-full flex items-center justify-center">
        {!user ? (
          <div className="flex items-center">
            <Button asChild variant="link">
              <Link href="/login"> Login </Link>
            </Button>
            <div> | </div>
            <Button asChild variant="link">
              <Link href={"/signup"}> Sign Up</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center w-full justify-evenly">
            <div>HI {profile ? profile.username : "User"}</div>

            <Button variant={"link"} asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            
          </div>
        )}
      </div>
 
    </div>
  );
}
