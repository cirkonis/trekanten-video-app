'use client';

import React from "react";
import {SignInButton} from "@/app/login/SignInButton";
import {HeaderNav} from "@/components/HeaderNav";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center p-24 text-pink-500">
          <div className="navbar-center">
              <a className="btn btn-ghost text-xl">Trekanten Video App</a>
          </div>
          Welcome
          <div className="my-4">👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿</div>
          <SignInButton></SignInButton>
      </main>
  )
}
